export default function Loading({ width, height }) {
    return (
        <div
            className={`border-[3px] border-[#F3F3F3] border-t-[4px] border-t-primary rounded-full w-[${width}px] h-[${height}px] animate-spin`}
        ></div>
    );
}
