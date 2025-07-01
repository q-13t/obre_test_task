import { useState, createContext, useEffect } from "react";
import { QuoteLimits } from "../enums/quote-limits.tsx";


export const QuotesContext = createContext();

export const QuotesContextProvider = ({ children, amount }) => {
    const [page, setPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(QuoteLimits.LIMIT_20);

    useEffect(() => {
        setTotalPages(Math.ceil(amount / limit));
        return () => { };
    }, [amount, limit]);

    return (
        <QuotesContext.Provider value={{ page, setPage, limit, setLimit, TotalPages, setTotalPages }}>
            {children}
        </QuotesContext.Provider>
    );
}