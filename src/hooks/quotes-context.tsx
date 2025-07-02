import { useState, createContext, useEffect } from "react";
import { QuoteLimits } from "../enums/quote-limits.tsx";
import { FilterCriteria, Order } from "../enums/filter-criteria.tsx";
import Quote from "../types/quote.tsx";


export const QuotesContext = createContext();

export const QuotesContextProvider = ({ children, q, setQ }) => {
    const [page, setPage] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(QuoteLimits.LIMIT_20);
    const [filterBy, setFilterBy] = useState(FilterCriteria.id);
    const [order, setOrder] = useState(Order.desc);
    const [query, setQuery] = useState("");
    const [selectedQueries, setSelectedQueries] = useState([]);

    function _handleDeleteQuotes(): void {
        setQ(q => q.filter(quote => !selectedQueries.includes(quote.id)));
        setSelectedQueries([]);
    }

    function _handleAddQuote(quote: Quote): void {
        setQ(q => [...q, quote]);
    }

    function _handleUpdateQuote(quote: Quote): void {
        setQ(q => q.map(q => q.id === quote.id ? quote : q));
    }

    function getMaxQuoteID(): number {
        return Math.max(...q.map(quote => quote.id));
    }

    useEffect(() => {
        setTotalPages(Math.ceil(q.length / limit));
        return () => { };
    }, [q.length, limit]);

    return (
        <QuotesContext.Provider value={{
            page, setPage, limit, setLimit, TotalPages, setTotalPages, filterBy, setFilterBy, order, setOrder,
            query, setQuery, selectedQueries, setSelectedQueries, _handleDeleteQuotes, _handleAddQuote,
            getMaxQuoteID, _handleUpdateQuote
        }}>
            {children}
        </QuotesContext.Provider>
    );
}