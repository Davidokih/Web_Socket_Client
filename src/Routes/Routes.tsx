import { useRoutes } from "react-router-dom";
import {
    SignIn,
    SignUp,
    Chats
} from "../Pages";
import {SearchResult} from "../Components"
// import Private from "../Private";
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
        {
            path: "/search_result",
            element: <SearchResult />
        },
    ])
    return element
}

export default Routes