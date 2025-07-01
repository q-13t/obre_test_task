import { useContext } from "react";
import ImageIcon from "../../elements/image-icon.tsx";
import ControlButton from "./elements/control-button.tsx";
import { QuotesContext } from "../../hooks/quotes-context.tsx";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { QuoteLimits } from "../../enums/quote-limits.tsx";
import { FilterCriteria, Order } from "../../types/filter-criteria.tsx";

const QuotesControl = () => {
    const context = useContext(QuotesContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const [filterCriteriaOpen, setFilterCriteriaOpen] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState(context.filterBy);
    const criteriaRef = useRef<HTMLDivElement>(null);

    const [orderOpen, setOrderOpen] = useState(false);
    const [order, setOrder] = useState(context.order);
    const orderRef = useRef<HTMLDivElement>(null);

    const [query, setQuery] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
            if (criteriaRef.current && !criteriaRef.current.contains(event.target as Node)) {
                setFilterCriteriaOpen(false);
            }
            if (orderRef.current && !orderRef.current.contains(event.target as Node)) {
                setOrderOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function _handleLimitChange(limit: QuoteLimits) {
        context.setLimit(limit);
        setMenuOpen(false);
    }

    function _handleFilterApply() {
        context.setFilterBy(filterCriteria);
        context.setOrder(order);
        context.setQuery(query);

        _handleFilterClose();
    }

    function _handleFilterClose() {
        setFilterOpen(false);
        setFilterCriteriaOpen(false);
        setOrderOpen(false);
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
                <span onClick={() => setFilterOpen(prev => !prev)}>
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
            {filterOpen && (
                <dialog open={filterOpen} className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex flex-col items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-md w-1/2 h-1/2 flex flex-col items-center justify-between">
                        <p className="text-lg font-semibold mb-4">Filter</p>
                        <div className="flex flex-row items-center gap-2">
                            <div className='relative  flex flex-row items-center' ref={criteriaRef}>
                                <button onClick={(e: MouseEvent) => setFilterCriteriaOpen(prev => !prev)} className="flex flex-row items-center justify-between w-max h-full rounded-[4px] mx-2 my-3">
                                    <p className="font-medium">Filter By: {filterCriteria}</p>
                                    <span className={` ${menuOpen ? 'rotate-180' : ''}`}>
                                        <ImageIcon path="/weui_arrow-outlined.svg" alt="down arrow" />
                                    </span>
                                </button>
                                {filterCriteriaOpen && (
                                    <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow-md w-48 z-20 h-48 overflow-y-scroll">
                                        {Object.values(FilterCriteria).map((criteria) => (
                                            <p key={criteria} onClick={() => { setFilterCriteria(criteria); setFilterCriteriaOpen(false); }} className="block px-4 py-2 hover:bg-gray-100">{criteria}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='relative  flex flex-row items-center' ref={orderRef}>
                                <button onClick={(e: MouseEvent) => setOrderOpen(prev => !prev)} className="flex flex-row items-center justify-between w-max h-full rounded-[4px] mx-2 my-3">
                                    <p className="font-medium">Order: {order}</p>
                                    <span className={` ${menuOpen ? 'rotate-180' : ''}`}>
                                        <ImageIcon path="/weui_arrow-outlined.svg" alt="down arrow" />
                                    </span>
                                </button>
                                {orderOpen && (
                                    <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow-md w-48 z-20 h-48 overflow-y-scroll">
                                        {Object.values(Order).map((order) => (
                                            <p key={order} onClick={() => { setOrder(order); setOrderOpen(false); }} className="block px-4 py-2 hover:bg-gray-100">{order}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row items-center align-middle justify-between w-full h-10 ">
                            <input type="text" placeholder="Filter by description" className="border border-gray-300 rounded  h-full w-full" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] h-full w-12 " onClick={() => { setQuery(''); }}>X</button>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3" onClick={() => _handleFilterApply()}>Apply</button>
                            <button className=" bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3" onClick={() => _handleFilterClose()}>Cancel</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default QuotesControl;