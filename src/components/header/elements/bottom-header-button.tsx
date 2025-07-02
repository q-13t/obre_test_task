/**
 * 
 * @param string image - image path based on public folder
 * @param   string text - button text
 * @param   function callback - callback function
 * @returns 
 */
const BottomHeaderButton = ({ image, text, callback }: { image: string, text: string, callback?: (e: MouseEvent) => void }) => {
    return (
        <div className="flex flex-col items-center justify-between w-full h-full hover:bg-[#B5B8FF] rounded-[4px]" onClick={(e: MouseEvent) => { callback?.(e); }}>
            <img src={image} alt="user-pfp" className="h-6 w-6 m-0 p-0" />
            <div className="flex flex-row items-center">
                <h1 className='font-normal'>{text}</h1>
                <img src="/icons/weui_arrow-outlined.svg" alt="down arrow" />
            </div>
        </div>
    );
}

export default BottomHeaderButton;