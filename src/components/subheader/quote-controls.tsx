import { useContext } from "react";
import ImageIcon from "../../elements/image-icon.tsx";
import ControlButton from "./elements/control-button.tsx";
import { QuotesContext } from "../../hooks/quotes-context.tsx";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { QuoteLimits } from "../../enums/quote-limits.tsx";

const QuotesControl = () => {
    const quotes = useContext(QuotesContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        quotes.setLimit(limit);
        setMenuOpen(false);
    }

    return (
        <div className="flex flex-row items-center justify-between h-[34px] w-full">
            <div className="flex flex-row items-center gap-2 h-full">
                <ControlButton text="Actioned" callback={() => { }} />
                <ControlButton text="Add" callback={() => { }} />
                <ControlButton text="Delete" callback={() => { }} />
                <ControlButton text="Preview Quotes" callback={() => { }} />
            </div>
            <div className=" relative  flex flex-row items-center gap-[30px]" ref={dropdownRef}>
                <ImageIcon path="/bx_search.svg" alt="search" />
                <button onClick={(e: MouseEvent) => setMenuOpen(prev => !prev)} className="flex flex-row items-center justify-between w-max h-full rounded-[4px] mx-2 my-3">
                    <p className="font-medium">Show {quotes.limit}</p>
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
        </div>
    );
}

export default QuotesControl;