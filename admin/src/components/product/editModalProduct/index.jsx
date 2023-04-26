import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { IconUploadFile } from "../../icon";

import styles from "./styles.module.css";

export default function EditModalProduct({ closeModal, title, titleBtnFooter, data }) {
    const previewImg = (e) => {
        console.log(e.target.value);
    };
    return (
        <div>
            <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
            <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
                <ModalHeader closeModal={closeModal} title={title} />
                <div className="h-full overflow-y-scroll grow mt-[20px]">
                    <form>
                        <div className="w-full flex  items-start px-[25px] my-[20px]">
                            <label className="w-1/3">Ảnh đại diện</label>
                            <div className="w-2/3">
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                                    onChange={previewImg}
                                />
                                <label htmlFor="file" className="grow">
                                    <div className="px-6 pt-5 pb-6 border-[1px] border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer flex flex-col items-center">
                                        <span>
                                            <IconUploadFile />
                                        </span>
                                        <p>Thêm ảnh tại đây</p>
                                        <em>(Chỉ nhận ảnh có đuôi *.jpeg and *.png )</em>
                                    </div>
                                </label>
                                <div className="h-[96px] w-[96px] mt-[10px]">
                                    <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-co-gai-cuc-cool-ngau-600x592.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex  items-start px-[25px] my-[20px]">
                            <label className="w-1/3">Ảnh sản phẩm</label>

                            <input
                                id="file"
                                multiple
                                type="file"
                                accept="image/*"
                                className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                            />
                            <label htmlFor="file" className="grow">
                                <div className="px-6 pt-5 pb-6 border-[1px] border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer flex flex-col items-center">
                                    <span>
                                        <IconUploadFile />
                                    </span>

                                    <p>Thêm ảnh tại đây</p>
                                    <em>(Chỉ nhận ảnh có đuôi *.jpeg and *.png )</em>
                                </div>
                            </label>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Tên sản phẩm</label>
                            </div>
                            <input
                                defaultValue={data.name}
                                type="text"
                                placeholder="Nhập tên sản phẩm"
                                className={`${styles.inputItem} `}
                            />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Thể loại</label>
                            </div>
                            <select className={`${styles.inputItem}`}>
                                <option>Rau củ</option>
                                <option>Hải sản</option>
                                <option>Trái cây</option>
                                <option>Đồ uống</option>
                                <option>Đồ khô</option>
                                <option>Thịt trưng</option>
                            </select>
                        </div>
                        <div className={`${styles.descriptionItem}`}>
                            <div className="w-1/3 py-[10px]">
                                <label>Mô tả</label>
                            </div>
                            <textarea
                                defaultValue={data.description}
                                type="text"
                                placeholder="Nhập mô tả chi tiết"
                                className={`${styles.descriptionInputItem}`}
                            />
                        </div>
                        <div className={`${styles.item} `}>
                            <div className="w-1/3">
                                <label>Giá</label>
                            </div>
                            <input
                                defaultValue={data.gia}
                                type="number"
                                placeholder="Nhập giá sản phẩm"
                                className={`${styles.inputItem}`}
                            />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Khuyến mãi</label>
                            </div>
                            <input
                                defaultValue={data.khuyenMai}
                                type="number"
                                placeholder="Nhập khuyến mãi"
                                className={`${styles.inputItem}`}
                            />
                        </div>
                        <input type="submit" hidden id="send" />
                    </form>
                </div>
                <ModalFooter title={titleBtnFooter} />
            </Drawer>
        </div>
    );
}