import { Navigate } from "react-router-dom";
import useAuth from "../store/auth";

// eslint-disable-next-line react/prop-types
function GuardRoute({ type, children }) {
    const isLogin = useAuth((state) => state.isLogin);
    if (!isLogin && type === "private") {
        return <Navigate to="/login" />;
    }

    if (isLogin && type === "guest") {
        return <Navigate to="/" />;
    }

    return children;
}

export default GuardRoute;
