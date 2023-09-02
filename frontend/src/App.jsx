import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import BookForm from "./pages/BookForm";
import GuardRoute from "./components/GuardRoute";

function App() {
    
  return (

        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <GuardRoute type="guest">
                            <Login />
                        </GuardRoute>
                    }
                />
                <Route
                    path="/book-form"
                    element={
                        <GuardRoute type="private">
                            <BookForm />
                        </GuardRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuardRoute type="guest">
                            <Register />
                        </GuardRoute>
                    }
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;
