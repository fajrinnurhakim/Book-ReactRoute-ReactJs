import { useState } from "react";
import { createBook } from "../fetch/books";
import {
    Container,
    Input,
    FormControl,
    FormLabel,
    NumberInput, // Menggunakan NumberInput
    NumberInputField, // Menggunakan NumberInputField
    Button,
    Box,
    Heading,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState(0); // Menggunakan nilai awal 0
    const [pages, setPages] = useState(0); // Menggunakan nilai awal 0
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("author", author);
            formData.append("publisher", publisher);
            formData.append("year", year); // Menggunakan nilai year (integer)
            formData.append("pages", pages); // Menggunakan nilai pages (integer)
            formData.append("image", image);

            await createBook(formData);
            Swal.fire({
                icon: "success",
                title: "Create Success",
                text: "Successfully Add Book",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Create Failed",
                text: "Something went wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <Container>
                <Heading as="h1" size="lg" mt={4} mb={2}>
                    Add New Book
                </Heading>
                <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            mb={2}
                        />
                        <FormLabel>Author</FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setAuthor(e.target.value)}
                            mb={2}
                        />
                        <FormLabel>Publisher</FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setPublisher(e.target.value)}
                            mb={2}
                        />
                        <FormLabel>Year</FormLabel>
                        <NumberInput
                            value={year}
                            onChange={(valueString) =>
                                setYear(parseInt(valueString, 10))
                            } // Mengubah string menjadi integer
                            mb={2}
                        >
                            <NumberInputField />
                        </NumberInput>
                        <FormLabel>Pages</FormLabel>
                        <NumberInput
                            value={pages}
                            onChange={(valueString) =>
                                setPages(parseInt(valueString, 10))
                            } // Mengubah string menjadi integer
                            mb={2}
                        >
                            <NumberInputField />
                        </NumberInput>
                        <FormLabel>Image</FormLabel>
                        <Input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            mb={2}
                        />
                        <Button colorScheme="teal" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </FormControl>
                </Box>
            </Container>
        </>
    );
}

export default BookForm;
