import { useContext, useMemo } from "react";
import { QuotesContext } from "../../hooks/quotes-context.tsx";
import Quote from "../../types/quote.tsx";
import Column from "./elements/column-element.tsx";
import { useEffect } from "react";
import { useState } from "react";
import { FilterCriteriaMap, Order } from "../../enums/filter-criteria.tsx";
import AddDialog from "../subheader/elements/add-dialog.tsx";




const Quotes = ({ q }: { q: Quote[] }) => {
    const context = useContext(QuotesContext);
    const quotes = useMemo(() => {
        const filtered = q
            .filter(quote =>
                quote.description.toString().toLowerCase().includes(context.query.toLowerCase())
            )
            .sort((a, b) => {
                const key = FilterCriteriaMap[context.filterBy];
                return context.order === Order.asc
                    ? a[key] - b[key]
                    : b[key] - a[key];
            });

        context.setTotalPages(Math.ceil(filtered.length / context.limit));

        return filtered.slice(
            (context.page - 1) * context.limit,
            context.page * context.limit
        );
    }, [
        context.query,
        context.filterBy,
        context.order,
        context.limit,
        context.page,
        q
    ]);

    const { subTotal, VAT, total, deposit, outstanding, profit } = useMemo(() => {
        let sub = 0,
            vat = 0,
            total = 0,
            deposit = 0,
            outstanding = 0,
            profit = 0;

        quotes.forEach(quote => {
            sub += quote.sub_total;
            vat += quote.VAT;
            total += quote.total;
            deposit += quote.deposit;
            outstanding += quote.outstanding;
            profit += quote.profit;
        });

        const format = (num: number) =>
            num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return {
            subTotal: format(sub),
            VAT: format(vat),
            total: format(total),
            deposit: format(deposit),
            outstanding: format(outstanding),
            profit: format(profit)
        };
    }, [quotes]);
    const [allSelected, setAllSelected] = useState(context.selectedQueries.length !== 0);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        setAllSelected(context.selectedQueries.length !== 0);
        return () => { };
        // eslint-disable-next-line
    }, [context.selectedQueries]);

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

    function _handleSelectAllQueries() {
        if (context.selectedQueries.length === quotes.length) {
            context.setSelectedQueries([]);
        } else {
            context.setSelectedQueries(quotes.map(quote => quote.id));
        }
    }

    function _handleSelectQuery(id: number) {
        if (context.selectedQueries.includes(id)) {
            context.setSelectedQueries(context.selectedQueries.filter(quote => quote !== id));
        } else {
            context.setSelectedQueries([...context.selectedQueries, id]);
        }
    }

    return (
        <div className="flex flex-col items-center h-full overflow-y-auto">
            <div className="overflow-y-auto   divide-y divide-gray-200 w-full max-w-screen overflow-x-auto">
                <div className="sticky top-0 z-10 bg-gray-100 grid grid-cols-[40px_40px_repeat(12,minmax(100px,1fr))_200px_minmax(100px,1fr)_minmax(100px,1fr)] w-full px-2 py-1 max-w-full gap-2">
                    <Column><input type="checkbox" checked={allSelected} onChange={() => { _handleSelectAllQueries(); }} /></Column>
                    <Column><img src="/icons/tabler_number.svg" alt="Number" className="h-6 w-6 m-0 p-0" /></Column>
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
                    <div key={quote.id} className="grid grid-cols-[40px_40px_repeat(12,minmax(100px,1fr))_200px_minmax(100px,1fr)_minmax(100px,1fr)] px-2 py-1 text-sm text-left odd:bg-[#EFEFEF] gap-2">
                        <Column ><input type="checkbox" checked={context.selectedQueries.includes(quote.id)} onChange={() => { _handleSelectQuery(quote.id); }} /></Column>
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
                        <div className="cursor-pointer" onClick={() => { setSelectedQuote(quote); setAddOpen(true); }}>
                            <Column ><img src="/icons/solar_pen-linear.svg" className="h-6 w-6" alt="Customer Job Ref" /></Column>
                        </div>

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
            {addOpen && <AddDialog setOpen={setAddOpen} quote={selectedQuote} />}
        </div>

    );
}

export default Quotes;