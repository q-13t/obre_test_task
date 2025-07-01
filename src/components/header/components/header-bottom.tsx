import BottomHeaderButton from "../elements/bottom-header-button.tsx";

const HederBottom = () => {
    // TODO: Specify callback functions for button clicks

    return (
        <div className="flex flex-row items-center justify-between p-3">
            <BottomHeaderButton image="/mingcute_horn-line.svg" text="Leads" />
            <BottomHeaderButton image="/document icon.svg" text="Quotes" />
            <BottomHeaderButton image="/tools icon.svg" text="jobs" />
            <BottomHeaderButton image="/calendar icon.svg" text="Planner" />
            <BottomHeaderButton image="/message.svg" text="Chat" />
            <BottomHeaderButton image="/finance icon.svg" text="Finance" />
            <BottomHeaderButton image="/contact icon.svg" text="Contacts" />
            <BottomHeaderButton image="/money icon.svg" text="Expenses" />
            <BottomHeaderButton image="/lucide_user-round.svg" text="User" />
        </div>
    );
}

export default HederBottom;