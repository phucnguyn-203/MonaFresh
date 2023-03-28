export default function Main({ sidebar, listProducts }) {
  return (
    <div className="flex mt-[40px] gap-x-6  ">
      {sidebar}
      {listProducts}
    </div>
  );
}
