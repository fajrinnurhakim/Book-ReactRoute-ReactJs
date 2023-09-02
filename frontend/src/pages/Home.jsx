import { useEffect, useState } from "react";
import { listBooks, deleteBook, updateBook } from "../fetch/books";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
} from "@chakra-ui/react";

function Home() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const initialFormData = {
        title: "",
        author: "",
        publisher: "",
        year: 0,
        pages: 0,
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchBooks = async () => {
        try {
            const response = await listBooks();
            console.log(response);
            setBooks(response.books);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);

            Swal.fire({
                icon: "success",
                title: "Delete Success",
                text: "Successfully delete",
                showConfirmButton: false,
                timer: 1500,
            });

            fetchBooks();
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: "Something went wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            year: book.year,
            pages: book.pages,
        });
        onOpen();
    };

    const handleUpdateBook = async () => {
        try {
            const updatedBook = await updateBook(selectedBook.id, formData);
            const updatedBooks = books.map((book) =>
                book.id === updatedBook.id ? updatedBook : book
            );
            setBooks(updatedBooks);
            onClose();
            Swal.fire({
                icon: "success",
                title: "Update Success",
                text: "Successfully updated book",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Title</Th>
                            <Th>Author</Th>
                            <Th>Publisher</Th>
                            <Th>Year</Th>
                            <Th>Pages</Th>
                            <Th>Images</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {books.map((book, index) => {
                            return (
                                <Tr key={book.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{book.title}</Td>
                                    <Td>{book.author}</Td>
                                    <Td>{book.publisher}</Td>
                                    <Td>{book.year}</Td>
                                    <Td>{book.pages}</Td>
                                    <Td>
                                        <Image
                                            boxSize="200px"
                                            objectFit="cover"
                                            src={`http://localhost:8000/${book.image}`}
                                            alt="image file"
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            colorScheme="red"
                                            onClick={() =>
                                                handleDeleteBook(book.id)
                                            }
                                        >
                                            DELETE
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => handleEditBook(book)}
                                        >
                                            EDIT
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                type="text"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <FormLabel>Author</FormLabel>
                            <Input
                                type="text"
                                value={formData.author}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        author: e.target.value,
                                    })
                                }
                            />
                            <FormLabel>Publisher</FormLabel>
                            <Input
                                type="text"
                                value={formData.publisher}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        publisher: e.target.value,
                                    })
                                }
                            />
                            <FormLabel>Year</FormLabel>
                            <Input
                                type="number"
                                value={formData.year}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        year: parseInt(e.target.value),
                                    })
                                }
                            />
                            <FormLabel>Pages</FormLabel>
                            <Input
                                type="number"
                                value={formData.pages}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        pages: parseInt(e.target.value),
                                    })
                                }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleUpdateBook}>
                            Save Changes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Home;
