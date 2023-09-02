import { useState } from "react";
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Heading,
    Flex,
    InputGroup,
    InputRightElement,
    IconButton,
} from "@chakra-ui/react";
import { login } from "../fetch/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth";

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setIsLogin = useAuth((state) => state.setIsLogin);

    const handleSubmit = async () => {
        try {
            await login({ email, password });
            setIsLogin(true);
            Swal.fire({
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Container maxW="md" p={4} w="100%" v="100%">
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >
                    <Box
                        borderWidth="1px"
                        borderRadius="lg"
                        p={6}
                        boxShadow="md"
                    >
                        <Heading size="lg" mb={4}>
                            Login
                        </Heading>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        icon={
                                            showPassword ? "view-off" : "view"
                                        }
                                        onClick={togglePasswordVisibility}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button
                            colorScheme="teal"
                            mt={6}
                            onClick={handleSubmit}
                            width="100%"
                        >
                            Login
                        </Button>
                    </Box>
                </Flex>
            </Container>
        </>
    );
}

export default Login;
