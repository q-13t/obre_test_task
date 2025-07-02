import { useContext, useState, useRef, useEffect } from 'react';
import { QuotesContext } from '../../../hooks/quotes-context.tsx';
import Quote from '../../../types/quote.tsx';
import { validate } from '../../../validators/quote-validator.tsx';
const AddDialog = ({ setOpen, quote }: { setOpen: Function, quote: Quote | null }) => {
    const context = useContext(QuotesContext);
    const modalRef = useRef(null);
    const [quoteName, setQuoteName] = useState(quote?.quote || "");
    const [date, setDate] = useState(quote?.date ? new Date(quote.date).toLocaleDateString('en-CA') : new Date());
    const [customer, setCustomer] = useState(quote?.customer || "");
    const [site, setSite] = useState(quote?.site_delivery || "");
    const [noQuotes, setNoQuotes] = useState(quote?.no_quotes || 0);
    const [subTotal, setSubTotal] = useState(quote?.sub_total || 0);
    const [VAT, setVAT] = useState(quote?.VAT || 0);
    const [total, setTotal] = useState(quote?.total || 0);
    const [deposit, setDeposit] = useState(quote?.deposit || 0);
    const [outstanding, setOutstanding] = useState(quote?.outstanding || 0);
    const [profit, setProfit] = useState(quote?.profit || 0);
    const [email, setEmail] = useState(quote?.email || "");
    const [description, setDescription] = useState(quote?.description || "");
    const [jobRef, setJobRef] = useState(quote?.job_ref || "");

    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    function _handleSave() {
        try {
            const q = new Quote(parseInt(context.getMaxQuoteID() + 1), quoteName, formatter.format(Date.parse(date)), customer, site, parseInt(noQuotes), parseFloat(subTotal), parseFloat(VAT), parseFloat(total), parseFloat(deposit), parseFloat(outstanding), parseFloat(profit), email, description, jobRef);
            validate(q);
            if (quote) {
                q.id = quote.id;
                context._handleUpdateQuote(q);
            } else {
                context._handleAddQuote(q);
            }
            setOpen(false);
        } catch (e) {
            alert(e);
            return;
        }
    }

    function _handleCloseDialog() {
        setOpen(false);
    }

    useEffect(() => {
        const checkClickWithin = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        window.addEventListener('mousedown', checkClickWithin);
        return () => {
            window.removeEventListener('mousedown', checkClickWithin);
        };
        // make the compiler stfu
        // eslint-disable-next-line
    }, []);

    return (
        <dialog open={true} className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-md w-96 h-30 flex flex-col items-center justify-between" ref={modalRef}>
                <h1>Add New Quote</h1>
                <div className="flex flex-col items-center justify-between w-full pt-6 h-[30vh] gap-2 overflow-auto overscroll-none">
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Quote Name" value={quoteName} onChange={(e) => setQuoteName(e.target.value)} />
                    <input type="date" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    <input type="text" className=" border border-gray-300 rounded-md p-2 w-full" placeholder="Site" value={site} onChange={(e) => setSite(e.target.value)} />
                    <input type="number" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="No. of Quotes" value={noQuotes} onChange={(e) => setNoQuotes(e.target.value)} />
                    <input type="number" step="0.01" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="Sub Total" value={subTotal} onChange={(e) => setSubTotal(e.target.value)} />
                    <input type="number" step="0.01" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="VAT" value={VAT} onChange={(e) => setVAT(e.target.value)} />
                    <input type="number" step="0.01" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="Total" value={total} onChange={(e) => setTotal(e.target.value)} />
                    <input type="number" step="0.01" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="Deposit" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                    <input type="number" step="0.01" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="Outstanding" value={outstanding} onChange={(e) => setOutstanding(e.target.value)} />
                    <input type="number" step="0.01" min={0} className="border border-gray-300 rounded-md p-2 w-full" onWheel={(e) => e.target.blur()} placeholder="Profit" value={profit} onChange={(e) => setProfit(e.target.value)} />
                    <input type="email" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Job Ref" value={jobRef} onChange={(e) => setJobRef(e.target.value)} />
                </div>
                <div className="flex flex-row items-center justify-around w-full pt-6">
                    <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3" onClick={() => { _handleSave(); }}>Save</button>
                    <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3" onClick={() => { _handleCloseDialog(); }}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
}

export default AddDialog;