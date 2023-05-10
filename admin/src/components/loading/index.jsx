export default function Loading({ size }) {
  return (
    <div
      className={`border-[4px] border-[#F3F3F3] border-t-[4px] border-t-primary rounded-full h-[${size}px] w-[${size}px] animate-spin`}
    ></div>
  );
}
