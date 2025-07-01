import { useEffect, useContext } from "react";
import { UserContext } from "./hooks/user-context.tsx";
import Header from "./components/header/header.tsx";
import QuotesControl from "./components/subheader/quote-controls.tsx";

function App() {
    const user = useContext(UserContext);

    // As if we perform login
    useEffect(() => {
        user.login({ id: 1, username: "q-13t", email: "temp@mail.org" });
        return () => {
            user.logout();
        };
    }, [user]);

    return (
        <div className="App px-4 py-2 h-max w-full">
            <Header />
            <QuotesControl />
        </div>
    );
}

export default App;
