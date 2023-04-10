import styles from "@/styles/Cart.module.css";
import { useEffect, useState } from "react";
export default function Cart() {
    const price = 71600;
    const [totalItem, setTotalItem] = useState(price);
    const [quantity, setQuantity] = useState(1);
    console.log(quantity);
    const CheckQuantity = () => {
        if (totalItem === 0) {
            setQuantity(1);
        }
    };
    const Reduce = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const Increase = () => {
        setQuantity(quantity + 1);
    };
    useEffect(() => {
        if (quantity === 0) {
            setQuantity("");
        }
        setTotalItem(quantity * price);
    }, [quantity]);
    return (
        <div className="container bg-[white]">
            <div className="py-[30px] box-border max-w-[1290px] w-full flex mx-auto">
                <div className="max-w-[60%] basis-[60%] w-full px-[1%]">
                    <table className="w-full mb-[1em] border-[#ececec] border-spacing-0">
                        <thead className="h-[55px] bg-[white] border-b-[3px] border-[#ececec] box-border uppercase leading-[1.05] tracking-[.05em] text-left p-[0.5em] w-[14%] text-[15px] uppercase ">
                            <tr className="bg-[white] border-b-[1px] border-[#ececec] box-border">
                                <td className="h-full text-[16px] font-[600] w-[50%] p-[0.5em] leading-[1.05] tracking-[.05em] text-left">
                                    <div className="w-full h-full flex items-center">
                                        <label class={styles.containerCheckbox}>
                                            <input className={styles.checkbox} type="checkbox" />
                                            <span class={styles.checkmark}></span>
                                        </label>
                                        <div className="text-center items-center ">Sản phẩm</div>
                                    </div>
                                </td>
                                <td className="h-full text-[16px] font-[600] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-left ">
                                    Giá
                                </td>
                                <td className="h-full text-[16px] font-[600] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-left ">
                                    Số lượng
                                </td>
                                <td className="h-full text-[16px] font-[600] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-right ">
                                    Tổng
                                </td>
                                <td className="h-full text-[16px] font-[600] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-right ">
                                    {" "}
                                </td>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className="bg-[white] border-b-[1px] border-[#ececec] box-border">
                                <td className="h-full text-[15px] font-[200] w-[50%] p-[0.5em] leading-[1.05] tracking-[.05em] text-left">
                                    <a
                                        className="w-full pl-[0] flex gap-x-0 gap-y-[10px] justify-between items-center"
                                        href=""
                                    >
                                        <label class={styles.containerCheckbox}>
                                            <input className={styles.checkbox} type="checkbox" />
                                            <span class={styles.checkmark}></span>
                                        </label>

                                        <img
                                            className="w-[80px]"
                                            src="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_trac_vang_bien_1_master-300x300.jpg"
                                            alt=""
                                        />
                                        <div className="w-full">Cá Trác vàng biển Ích Hữu 400g</div>
                                    </a>
                                </td>
                                <td className="h-full text-[15px] font-[200] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-left whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                                    {price}đ
                                </td>
                                <td className="h-full text-[15px] font-[200] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-left">
                                    <div className="m-0 text-center opacity-100 inline-flex whitespace-nowrap align-top">
                                        <button
                                            onClick={Reduce}
                                            className="w-[25px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            onChange={(e) => setQuantity(+e.target.value)}
                                            onBlur={CheckQuantity}
                                            value={quantity}
                                            className={`${styles.input} ${styles.qty}`}
                                        />
                                        <button
                                            onClick={Increase}
                                            className="w-[25px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="h-full text-[15px] font-[200] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-right whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                                    {totalItem}đ
                                </td>
                                <td className="h-full text-[15px] font-[200] w-[14%] p-[0.5em] leading-[1.05] tracking-[.05em] text-right">
                                    <button className="w-[25px] h-[25px] truncate relative text-[#ddd] text-[25px] font-normal hover:text-[#d26e4b] hover:scale-[120%]">
                                        ✖
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-[15px] font-[600] text-center mt-10px w-full border-0 flex uppercase">
                        <a className="text-center border-[2px] border-[#6abd45] bg-[white] text-[#6abd45] w-[30%] min-h-[40px] flex items-center justify-center hover:text-[white] hover:bg-[#6abd45]">
                            <div>← Tiếp tục xem sản phẩm</div>
                        </a>
                        <button className="text-center bg-[#93db73e3] text-[white] w-[25%] min-h-[40px] ml-[10px] flex items-center justify-center uppercase hover:bg-[#7dc95c]">
                            <div>Cập nhật giỏ hàng</div>
                        </button>
                        <button className="text-center bg-[#d26e4b] text-[white] w-[27%] min-h-[40px] ml-[10px] flex items-center justify-center uppercase hover:bg-[#a8583c]">
                            <div>Xoá các mục đã chọn</div>
                        </button>
                    </div>
                </div>
                <div className="border-l-[1px] border-[#ececec] max-w-[40%] basis-[40%] w-full px-[1%]">
                    <div className="w-full mb-[1em] border-[#ececec] border-spacing-0 box-border">
                        <div className="h-[55px] bg-[white] border-b-[3px] border-[#ececec] box-border tracking-[.05em] text-left p-[0.5em] w-full uppercase text-[15px]">
                            <div className="flex items-center h-full text-16px font-[600]">Tổng số lượng</div>
                        </div>
                        <div className="min-h-[55px] bg-[white] box-border p-[0.5em] w-full text-[15px] flex items-center border-b-[1px] border-[#ececec]">
                            <div className="w-[15%] text-left text-[15px] font-[600]">
                                <div>Tổng phụ</div>
                            </div>
                            <div className="w-[85%] text-right text-[13px]">
                                <div className="whitespace-nowrap text-[#6abd45] font-bold text-[16px]">71600đ</div>
                            </div>
                        </div>
                        <div className="min-h-[55px] bg-[white] box-border p-[0.5em] w-full text-[15px] flex items-center border-b-[1px] border-[#ececec]">
                            <div className="w-[15%] text-left text-[15px] font-[600]">
                                <div>Giao hàng</div>
                            </div>
                            <div className="w-[85%] text-right text-[13px]">
                                <div>Giao hàng miễn phí</div>
                                <div>Đây chỉ là ước tính. Giá sẽ cập nhật trong quá trình thanh toán</div>
                                <div>Tính phí giao hàng</div>
                            </div>
                        </div>
                        <div className="min-h-[55px] bg-[white] box-border p-[0.5em] w-full text-[15px] flex items-center border-b-[1px] border-[#ececec]">
                            <div className="w-[15%] text-left text-[15px] font-[600]">
                                <div>Tổng</div>
                            </div>
                            <div className="w-[85%] text-right text-[13px]">
                                <div className="whitespace-nowrap text-[#6abd45] font-bold text-[16px]">71600đ</div>
                            </div>
                        </div>

                        <div className="border-t-[2px] border-[#ececec] pt-[20px]">
                            <button className="bg-[#d26e4b] text-[white] w-full min-h-[40px] flex items-center text-center justify-center uppercase hover:bg-[#a8583c]">
                                Tiến hành thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
