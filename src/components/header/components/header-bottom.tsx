import BottomHeaderButton from "../elements/bottom-header-button.tsx";
import { useState, useEffect } from 'react';

const HederBottom = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isOpen, setIsOpen] = useState();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 720) {
                setIsMinimized(true);
            } if (window.innerWidth >= 720) {
                setIsMinimized(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="md:flex md:flex-row grid grid-cols-3 items-center justify-between p-3">
            {
                isMinimized ? (
                    <>
                        <div className="md:display-none col-span-3 flex flex-col items-center justify-between w-full  h-full hover:bg-[#B5B8FF] rounded-[4px]" onClick={() => { setIsOpen(!isOpen); }}>
                            <img src="/icons/weui_arrow-outlined.svg" alt="down arrow" className={`h-6 w-6 m-0 p-0 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                        {
                            isOpen ? (
                                <>
                                    <BottomHeaderButton image="/icons/mingcute_horn-line.svg" text="Leads" />
                                    <BottomHeaderButton image="/icons/document icon.svg" text="Quotes" />
                                    <BottomHeaderButton image="/icons/tools icon.svg" text="Jobs" />
                                    <BottomHeaderButton image="/icons/calendar icon.svg" text="Planner" />
                                    <BottomHeaderButton image="/icons/message.svg" text="Chat" />
                                    <BottomHeaderButton image="/icons/finance icon.svg" text="Finance" />
                                    <BottomHeaderButton image="/icons/contact icon.svg" text="Contacts" />
                                    <BottomHeaderButton image="/icons/money icon.svg" text="Expenses" />
                                    <BottomHeaderButton image="/icons/lucide_user-round.svg" text="User" />
                                </>
                            ) : (
                                null
                            )
                        }
                    </>
                ) : (
                    <>
                        <BottomHeaderButton image="/icons/mingcute_horn-line.svg" text="Leads" />
                        <BottomHeaderButton image="/icons/document icon.svg" text="Quotes" />
                        <BottomHeaderButton image="/icons/tools icon.svg" text="Jobs" />
                        <BottomHeaderButton image="/icons/calendar icon.svg" text="Planner" />
                        <BottomHeaderButton image="/icons/message.svg" text="Chat" />
                        <BottomHeaderButton image="/icons/finance icon.svg" text="Finance" />
                        <BottomHeaderButton image="/icons/contact icon.svg" text="Contacts" />
                        <BottomHeaderButton image="/icons/money icon.svg" text="Expenses" />
                        <BottomHeaderButton image="/icons/lucide_user-round.svg" text="User" />
                    </>
                )
            }
        </div >

    );
}

export default HederBottom;