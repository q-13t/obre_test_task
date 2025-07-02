import { useEffect, useContext, useState } from "react";
import { UserContext } from "./hooks/user-context.tsx";
import Header from "./components/header/header.tsx";
import QuotesControl from "./components/subheader/quote-controls.tsx";
import Quotes from "./components/table/quotes-table.tsx";
import { QuotesContextProvider } from "./hooks/quotes-context.tsx";
import Quote from "./types/quote.tsx";

function getRandom(min: number, max: number): string {
    return (Math.random() * (max - min + 1) + min).toFixed(2);
}


function App() {
    const user = useContext(UserContext);

    const [q, setq] = useState(Array.from({ length: 1_000 }, (_, i) => new Quote(i, `QU-${i}`, "11/02/2025", "Customer", "Flat 19, 2, Havanna Drive, London NW11 9BB", Math.floor(parseFloat(getRandom(0, 100))), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), `temp@mail.org`, `Sample description ${i}`, 'job ref')));

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
            <QuotesContextProvider q={q} setQ={setq}>
                <QuotesControl q={q} />
                <Quotes q={q} />
            </QuotesContextProvider>
        </div>
    );
}

export default App;