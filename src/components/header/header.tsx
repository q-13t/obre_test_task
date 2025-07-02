import HederBottom from "./components/header-bottom.tsx";
import HeaderTop from "./components/header-top.tsx";

const Header = () => {
    return (
        <div className="p-0 m-0">
            <HeaderTop />
            <HederBottom />
        </div>
    );
}

export default Header;