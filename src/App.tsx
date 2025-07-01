import { useEffect, useContext } from "react";
import { UserContext } from "./hooks/user-context.tsx";
import Header from "./components/header/header.tsx";
import QuotesControl from "./components/subheader/quote-controls.tsx";
import Quotes from "./components/table/quotes-table.tsx";
import QuotesContextProvider from "./hooks/quotes-context.tsx";



function App() {
    const user = useContext(UserContext);

    useEffect(() => {
        // Assuming user has been logged in before
        user.login({ id: 1, username: "q-13t", email: "temp@mail.org" });

        return () => {
            user.logout();
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className="px-4 py-2 h-screen w-full flex flex-col max-h-screen max-w-screen ">
            <Header />
            <QuotesContextProvider>
                <QuotesControl />
                <Quotes />
            </QuotesContextProvider>
        </div>
    );
}

export default App;
