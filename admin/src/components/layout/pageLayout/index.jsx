export default function PageLayout({ title, children }) {
    return (
        <div className="px-6 h-full overflow-auto">
            <h1 className="my-6 text-lg font-bold">{title}</h1>
            {children}
        </div>
    );
}
