export default function Drawer({ children }) {
    return (
        <div className=" bg-white fixed w-1/2 flex flex-col h-screen right-0 top-0 z-50 bg-opacity-100 shadow-2xl opacity-100">
            {children}
        </div>
    );
}
