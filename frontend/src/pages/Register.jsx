import { useState } from "react";
import {
    Box,
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
} from "@chakra-ui/react";
import { registerUser } from "../fetch/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const userData = {
                name,
                email,
                password,
            };

            await registerUser(userData);

            Swal.fire({
                icon: "success",
                title: "Registration Success",
                text: "You have successfully registered.",
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect to login page or any other route after successful registration
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Something went wrong during registration.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <Container centerContent>
            <Box
                p={4}
                mt={8}
                width="100%"
                maxWidth="400px"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
            >
                <VStack spacing={4}>
                    <Text fontSize="xl">Register</Text>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            mb={4} // Menambahkan margin bottom 4 (atau sesuaikan dengan kebutuhan)
                        />
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            mb={4} // Menambahkan margin bottom 4 (atau sesuaikan dengan kebutuhan)
                        />
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            mb={4} // Menambahkan margin bottom 4 (atau sesuaikan dengan kebutuhan)
                        />
                        <Button
                            colorScheme="teal"
                            onClick={handleSubmit}
                            mt={4}
                        >
                            Register
                        </Button>
                    </FormControl>
                </VStack>
            </Box>
        </Container>
    );
}

export default Register;
