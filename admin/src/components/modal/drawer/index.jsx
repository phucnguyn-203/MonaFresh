export default function Drawer({ isFullWidth = true, children }) {
  return (
    <div
      className={`${
        isFullWidth ? "w-full" : "w-1/2"
      } bg-white fixed flex flex-col h-screen right-0 top-0 z-50 bg-opacity-100 shadow-2xl opacity-100 `}
    >
      {children}
    </div>
  );
}
