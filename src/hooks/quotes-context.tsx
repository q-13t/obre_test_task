import { createContext } from "react";

const quotesContext = createContext();

const QuotesContextProvider = ({ children }) => {
    return (
        <quotesContext.Provider value={{}}>
            {children}
        </quotesContext.Provider>
    );
}

export default QuotesContextProvider;