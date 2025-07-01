import ImageIcon from "../../elements/image-icon.tsx";
import ControlButton from "./elements/control-button.tsx";

const QuotesControl = () => {
    return (
        <div className="flex flex-row items-center justify-between h-[34px] w-full">
            <div className="flex flex-row items-center gap-2 h-full">
                <ControlButton text="Actioned" callback={() => { }} />
                <ControlButton text="Add" callback={() => { }} />
                <ControlButton text="Delete" callback={() => { }} />
                <ControlButton text="Preview Quotes" callback={() => { }} />

            </div>
            <div className="flex flex-row items-center gap-[30px]">
                <ImageIcon path="/bx_search.svg" alt="search" />
                <div conClick={(e: MouseEvent) => { }} className="flex flex-row items-center justify-between w-max h-full rounded-[4px] mx-2 my-3">
                    <p className="font-medium">Show</p>
                    <p>{/* TODO: Show number of quotes */}</p>
                    <ImageIcon path="/weui_arrow-outlined.svg" alt="down arrow" />
                </div>
                <p className="font-medium">Print</p>
                <p className="font-medium">Export</p>
            </div>
        </div>
    );
}

export default QuotesControl;