import { useContext } from "react";
import { UserContext } from "../../../hooks/user-context.tsx";
import ImageIcon from "../../../elements/image-icon.tsx";

const HeaderTop = () => {
    const User = useContext(UserContext);
    return (
        <div className="flex flex-row items-between justify-between py-4 border-b border-[#0000001A]">
            <div className="flex flex-row items-center gap-2">
                <img src="/react.svg" alt="user-pfp" className="h-8 w-8 m-0 p-0 bg-[#AAA9A9]" />
                <h1 className='font-semibold'>Hi {User.User?.username}!</h1>
            </div>
            <div className="flex flex-row items-center gap-2">
                <ImageIcon path="/message.svg" alt="message" />
                <ImageIcon path="/notification icon.svg" alt="notification" />
                <ImageIcon path="/partner icon.svg" alt="partner" />
                <ImageIcon path="/setting icon.svg" alt="settings" />
                <img src="/react.svg" alt="user-pfp" className="h-8 w-8 m-0 p-0 bg-[#AAA9A9] rounded-full" />
            </div>
        </div>
    );
}

export default HeaderTop;