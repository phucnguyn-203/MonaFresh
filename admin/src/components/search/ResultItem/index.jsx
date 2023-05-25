import jsUcfirst from "../../../utils/jsUcfirst";
import formatCurrency from "../../../utils/formatCurrency";

export default function ResultItem({
  id,
  thumbnail,
  name,
  importPrice,
  quantity,
  products,
  setProducts,
  closeSearchResult,
}) {
  return (
    <div
      className="p-4 hover:bg-slate-200 hover:rounded-lg flex items-center cursor-pointer"
      onClick={() => {
        if (products.find((item) => item._id === id)) {
          alert("Sản phẩm đã được thêm. Vui lòng chọn lại.");
          closeSearchResult();
        } else {
          setProducts([
            ...products,
            {
              _id: id,
              product: { id: id, name: name, importPrice: importPrice, quantity: quantity },
              quantity: 1,
            },
          ]);
          closeSearchResult();
        }
      }}
    >
      <img src={thumbnail} alt="product" className="rounded-lg" width={40} height={40} />
      <div className="text-center px-1 text-xs">{jsUcfirst(name)}</div>
      <span className="text-xs text-green-600 font-bold">{formatCurrency(importPrice)}</span>
      <span className="text-xs ml-[5px]">Hiện có {quantity} sản phẩm</span>
    </div>
  );
}
