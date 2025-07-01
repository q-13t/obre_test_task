import { useEffect } from "react";
import { UserContext } from "./hooks/user-context.tsx";
import { useContext } from "react";


function App() {
    const user = useContext(UserContext);

    // As if we perform login
    useEffect(() => {
        user.login({ id: 1, username: "q-13t", email: "temp@mail.org" });
        return () => {
            user.logout();
        };
    }, []);

    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Hello</h1>
        </div>
    );
}

export default App;
