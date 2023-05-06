import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import authAPI from "../api/authAPI";
import { setUserSuccess, setUserFail } from "../features/auth/authSlice";
import Loading from "../components/loading";

export default function ProtectedRoute({ children }) {
    const auth = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkIsLogin = async () => {
            try {
                const response = await authAPI.checkIsLogin();
                dispatch(setUserSuccess(response.data));
                setIsLoading(false);
            } catch {
                dispatch(setUserFail);
                setIsLoading(false);
            }
        };
        checkIsLogin();
    }, []);

    return (
        <React.Fragment>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loading width={64} height={64} />
                </div>
            ) : auth.isAuth && (auth.currentUser.role === 1 || auth.currentUser.role === 3) ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </React.Fragment>
    );
}
