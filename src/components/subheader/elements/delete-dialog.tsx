import { QuotesContext } from "../../../hooks/quotes-context.tsx";
import { useContext, useEffect, useRef } from 'react';


const DeleteDialog = ({ setOpen }) => {
    const context = useContext(QuotesContext);
    const modalRef = useRef(null);

    function _handleApply() {
        context._handleDeleteQuotes();
        setOpen(false);
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
                <p>Are you sure you want to delete this quote(s)?</p>

                <div className="flex flex-row items-center justify-around w-full pt-6">
                    <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3" onClick={() => { _handleApply(); }}>Apply</button>
                    <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3" onClick={() => { _handleCloseDialog(); }}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
}

export default DeleteDialog;