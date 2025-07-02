const ControlButton = ({ text, callback }: { text: string, callback?: (e: MouseEvent) => void }) => {
    return (
        <button onClick={(e: MouseEvent) => { callback?.(e); }} className="flex flex-row items-center justify-between align-middle w-auto h-full bg-[#B5B8FF] hover:bg-[#1D28FF] hover:text-white rounded-[4px] px-2 py-3">
            <p className="font-medium h-max w-max">{text}</p>
        </button>
    );
}

export default ControlButton;