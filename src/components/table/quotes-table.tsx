import { useContext } from "react";
import { QuotesContext } from "../../hooks/quotes-context.tsx";
import Quote from "../../types/quote.tsx";
import Column from "./elements/column-element.tsx";
import { useEffect } from "react";
import { useState } from "react";




const Quotes = ({ q }: { q: Quote[] }) => {
    const context = useContext(QuotesContext);
    const [quotes, setQuotes] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [total, setTotal] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [outstanding, setOutstanding] = useState(0);
    const [profit, setProfit] = useState(0);


    useEffect(() => {
        // As if performed fetch
        let tmp = q.slice((context.page - 1) * context.limit, context.page * context.limit);

        setQuotes(tmp);

        let sub = 0, vat = 0, total = 0, deposit = 0, outstanding = 0, profit = 0;
        tmp.forEach(quote => {
            sub += quote.sub_total;
            vat += quote.VAT;
            total += quote.total;
            deposit += quote.deposit;
            outstanding += quote.outstanding;
            profit += quote.profit;
        });
        setSubTotal(sub.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setVAT(vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTotal(total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setDeposit(deposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setOutstanding(outstanding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setProfit(profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

        return () => { };
    }, [context.limit, context.page]);

    function _handlePageChange(page: number) {
        context.setPage(page);
    }
    const getPages = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        if (context.TotalPages <= 1) return [1];
        pages.push(1);
        if (context.page - 2 > 2) {
            pages.push('...')
        } else if (context.page - 2 === 2) {
            pages.push(2)
        }
        if (context.page - 1 > 1) {
            pages.push(context.page - 1)
        }
        if (context.page !== 1 && context.page !== context.TotalPages) {
            pages.push(context.page)
        }
        if (context.page + 1 < context.TotalPages) {
            pages.push(context.page + 1)
        }
        if (context.page + 2 < context.TotalPages - 1) {
            pages.push('...')
        } else if (context.page + 2 === context.TotalPages - 1) {
            pages.push(context.TotalPages - 1)
        }
        if (context.TotalPages !== 1) {
            pages.push(context.TotalPages)
        }
        return pages;
    }

    return (
        <div className="flex flex-col items-center h-full overflow-y-auto">
            <div className="overflow-y-auto   divide-y divide-gray-200 w-full max-w-screen overflow-x-auto">
                <div className="sticky top-0 z-10 bg-gray-100 grid grid-cols-[40px_40px_repeat(12,minmax(100px,1fr))_200px_minmax(100px,1fr)_minmax(100px,1fr)] w-full px-2 py-1 max-w-full gap-2">
                    <Column><input type="checkbox" /></Column>
                    <Column><img src="/tabler_number.svg" alt="Number" className="h-6 w-6 m-0 p-0" /></Column>
                    <Column><p className="font-semibold">Quote</p></Column>
                    <Column><p className="font-semibold">Date</p></Column>
                    <Column><p className="font-semibold">Customer</p></Column>
                    <Column><p className="font-semibold">Site/Delivery</p></Column>
                    <Column><p className="font-semibold">No. Quotes</p></Column>
                    <Column><p className="font-semibold">Sub Total</p></Column>
                    <Column><p className="font-semibold">VAT</p></Column>
                    <Column><p className="font-semibold">Total</p></Column>
                    <Column><p className="font-semibold">Deposit</p></Column>
                    <Column><p className="font-semibold">Outstanding</p></Column>
                    <Column><p className="font-semibold">Profit</p></Column>
                    <Column><p className="font-semibold">Email</p></Column>
                    <Column><p className="font-semibold">Description</p></Column>
                    <Column><p className="font-semibold">Customer Job Ref</p></Column>
                </div>
                {quotes.map((quote: Quote, index: number) => (
                    <div className="grid grid-cols-[40px_40px_repeat(12,minmax(100px,1fr))_200px_minmax(100px,1fr)_minmax(100px,1fr)] px-2 py-1 text-sm text-left odd:bg-[#EFEFEF] gap-2">
                        <Column ><input type="checkbox" /></Column>
                        <Column ><p>{quote.id}</p></Column>
                        <Column ><p>{quote.quote}</p></Column>
                        <Column ><p>{quote.date}</p></Column>
                        <Column ><p>{quote.customer}</p></Column>
                        <Column ><p>{quote.site_delivery}</p></Column>
                        <Column ><p>{quote.no_quotes}</p></Column>
                        <Column ><p>£{quote.sub_total}</p></Column>
                        <Column ><p>£{quote.VAT}</p></Column>
                        <Column ><p>£{quote.total}</p></Column>
                        <Column ><p>£{quote.deposit}</p></Column>
                        <Column ><p>£{quote.outstanding}</p></Column>
                        <Column ><p>£{quote.profit}</p></Column>
                        <Column ><p>{quote.email}</p></Column>
                        <Column ><p>{quote.description}</p></Column>
                        <Column ><img src="solar_pen-linear.svg" className="h-6 w-6" alt="Customer Job Ref" /></Column>
                    </div>
                ))}
                <div className="grid sticky bottom-0 z-10 grid-cols-[40px_40px_repeat(12,minmax(100px,1fr))_200px_minmax(100px,1fr)_minmax(100px,1fr)] px-2 py-1 text-sm text-left odd:bg-white even:bg-gray-50 gap-2">
                    <div className="col-span-7">Page Sub Total:</div>
                    <Column><p className="font-semibold">£{subTotal}</p></Column>
                    <Column><p className="font-semibold">£{VAT}</p></Column>
                    <Column><p className="font-semibold">£{total}</p></Column>
                    <Column><p className="font-semibold">£{deposit}</p></Column>
                    <Column><p className="font-semibold">£{outstanding}</p></Column>
                    <Column><p className="font-semibold">£{profit}</p></Column>
                </div>
            </div>
            <div className="flex justify-center items-center h-[34px] w-full border-t">
                <button onClick={() => context.page > 1 && _handlePageChange(context.page - 1)} disabled={context.page === 1} className={`px-3 `}>&lt;</button>
                {
                    getPages().map((page, index) => (
                        typeof page === 'number' ? (
                            <button key={index} onClick={() => _handlePageChange(page)} className={`px-2${page === context.page ? 'font-bold' : ''}`}>{page}</button>
                        ) : (
                            <span key={index} className="px-2 py-1 text-gray-500">…</span>
                        )
                    ))
                }
                <button onClick={() => context.page < context.TotalPages && _handlePageChange(context.page + 1)} disabled={context.page === context.TotalPages} className={`px-3 `}>&gt;</button>
            </div>
        </div>

    );
}

export default Quotes;