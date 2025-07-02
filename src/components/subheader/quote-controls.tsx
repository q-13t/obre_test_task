import ImageIcon from "../../elements/image-icon.tsx";
import ControlButton from "./elements/control-button.tsx";
import { QuotesContext } from "../../hooks/quotes-context.tsx";
import { useRef, useEffect, useState, useContext } from "react";
import { QuoteLimits } from "../../enums/quote-limits.tsx";
import FilterDialog from "./elements/filter-dialog.tsx";
import DeleteDialog from "./elements/delete-dialog.tsx";
import AddDialog from "./elements/add-dialog.tsx";

const QuotesControl = ({ q }) => {
    const context = useContext(QuotesContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function _handleLimitChange(limit: QuoteLimits) {
        context.setLimit(limit);
        setMenuOpen(false);
    }



    return (
        <div className="flex md:flex-row flex-col items-center justify-between md:h-[34px] h-max w-full">
            <div className="flex flex-row items-center gap-2 h-full">
                <ControlButton text="Actioned" callback={() => { }} />
                <ControlButton text="Add" callback={() => { setAddOpen(true) }} />
                <ControlButton text="Delete" callback={() => { setDeleteConfirmationOpen(true) }} />
                <ControlButton text="Preview Quotes" callback={() => { }} />
            </div>
            <div className=" relative  flex flex-row items-center gap-[30px] " ref={dropdownRef}>
                <span onClick={() => setFilterOpen(prev => !prev)} className="cursor-pointer">
                    <ImageIcon path="/bx_search.svg" alt="search" />
                </span>
                <button onClick={(e: MouseEvent) => setMenuOpen(prev => !prev)} className="flex flex-row items-center justify-between w-max h-full rounded-[4px] mx-2 my-3">
                    <p className="font-medium">Show {context.limit}</p>
                    <span className={` ${menuOpen ? 'rotate-180' : ''}`}>
                        <ImageIcon path="/weui_arrow-outlined.svg" alt="down arrow" />
                    </span>
                </button>
                {menuOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow-md w-48 z-20">
                        {Object.values(QuoteLimits).filter(limit => typeof limit === 'number').map((limit) => (
                            <p key={limit} onClick={() => _handleLimitChange(limit)} className="block px-4 py-2 hover:bg-gray-100">{limit}</p>
                        ))}
                    </div>
                )}
                <p className="font-medium">Print</p>
                <p className="font-medium">Export</p>
            </div>
            {filterOpen && <FilterDialog setFilterOpen={setFilterOpen} />}
            {deleteConfirmationOpen && <DeleteDialog setOpen={setDeleteConfirmationOpen} />}
            {addOpen && <AddDialog setOpen={setAddOpen} quote={null} />}
        </div>
    );
}

export default QuotesControl;