import { useRoutes } from "react-router-dom";
import {
    SignIn,
    SignUp,
    Chats
} from "../Pages";
const Routes = () => {
    let element = useRoutes([
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/signin",
            element: <SignIn />
        },
        {
            path: "/chat_interface",
            element: <Chats />
        },
    ])
    return element
}

export default Routes