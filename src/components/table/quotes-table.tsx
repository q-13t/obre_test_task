import Quote from "../../types/quote.tsx";
import Column from "./elements/column-element.tsx";


function getRandom(min: number, max: number): string {
    return (Math.random() * (max - min + 1) + min).toFixed(2);
}

const quotes: Quote[] = Array.from({ length: 15 }, (_, i) => new Quote(i, `QU-${i}`, "11/02/2025", "Customer", "Flat 19, 2, Havanna Drive, London NW11 9BB", Math.floor(parseFloat(getRandom(0, 100))), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), parseFloat(getRandom(0, 10_000)), `temp@mail.org`, "Sample description"));

const Quotes = () => {

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
                {quotes.map((quote) => (
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
                    <Column><p className="font-semibold">£0.00</p></Column>
                    <Column><p className="font-semibold">£0.00</p></Column>
                    <Column><p className="font-semibold">£0.00</p></Column>
                    <Column><p className="font-semibold">£0.00</p></Column>
                    <Column><p className="font-semibold">£0.00</p></Column>
                    <Column><p className="font-semibold">£0.00</p></Column>
                </div>
            </div>
            <div className="flex justify-center items-center h-[34px] w-full border-t">
                <p>{"< 1 2 3 >"}</p>
            </div>
        </div>

    );
}

export default Quotes;