
import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydreadUser } from "../features/auth/api/useApi";
import { addUser, setAuthLoading } from "../features/auth/state/authSlice";
import Register from "../features/auth/ui/components/Register";
import Login from "../features/auth/ui/components/Login";
import Profile from "../features/auth/ui/components/Profile";

const AppRout = () => {
    const dispatch = useDispatch();

    // Check logged-in user
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await hydreadUser();
                dispatch(addUser(res.data.data.user));
            } catch (error) {
                console.log("User not logged in:", error);
                dispatch(addUser(null));
            } finally {
                dispatch(setAuthLoading(false));
            }
        };

        checkUser();
    }, [dispatch]);

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },{
            path:"profile",
            element:<Profile/>
        }
    ]);

    return <RouterProvider router={router} />;
};

export default AppRout;
