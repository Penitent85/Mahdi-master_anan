import { useContext } from "react";
// import { MainComponentContext } from "../context/Context";
export default function useUserContext() {
    const user = useContext(MainComponentContext);
    if (user === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return user;
}
