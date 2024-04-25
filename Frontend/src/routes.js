import { useRoutes } from "react-router-dom"
import Login from './component/login/login.js'
import Register from "./component/register/register.js"
import Auth from './hoc/auth.js'
import Home from "./component/home/home.js"
import PostUpload from "./component/post_upload/post_upload.js"

export const CustomRoutes = () => {
    return useRoutes([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/",
            element: <Auth />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/create",
                    element: <PostUpload />
                },
                {
                    path: "/create/:postId",
                    element: <PostUpload />
                }
            ]
        }
    ])
}