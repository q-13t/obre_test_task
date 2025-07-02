const Column = ({ children }) => {
    return (
        <div className={`flex flex-row items-center`}>
            {children}
        </div>
    );
}

export default Column;