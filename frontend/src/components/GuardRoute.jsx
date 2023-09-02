import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function GuardRoute({ type, children }) {
    const token = localStorage.getItem("token");
    if (!token && type === "private") {
        return <Navigate to="/login" />;
    }

    if (token && type === "guest") {
        return <Navigate to="/" />;
    }

    

    return children;
}

export default GuardRoute;
