import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogin(!!token);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            p={4}
            bg="blue.500"
            color="white"
            boxShadow="md"
        >
            <Box>
                <Link
                    as={RouterLink}
                    to="/"
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Text fontSize="xl" fontWeight="bold">
                        Books
                    </Text>
                </Link>
            </Box>
            <Box>
                <Link
                    as={RouterLink}
                    to="/"
                    mr={4}
                    _hover={{
                        textDecoration: "underline",
                    }}
                >
                    Home
                </Link>
                <Link
                    as={RouterLink}
                    to="/book-form"
                    mr={4}
                    _hover={{
                        textDecoration: "underline",
                    }}
                >
                    Add
                </Link>
                {isLogin ? (
                    <Button onClick={logout}>Logout</Button>
                ) : (
                    <>
                        <Link
                            as={RouterLink}
                            to="/register"
                            mr={4}
                            _hover={{
                                textDecoration: "underline",
                            }}
                        >
                            Register
                        </Link>
                        <Link
                            as={RouterLink}
                            to="/login"
                            _hover={{
                                textDecoration: "underline",
                            }}
                        >
                            Login
                        </Link>
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default Navbar;
