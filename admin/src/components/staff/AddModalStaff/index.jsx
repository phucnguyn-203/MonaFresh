import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { IconUploadFile } from "../../icon";

import styles from "./styles.module.css";

export default function AddModalStaff({ closeModal, title, titleBtnFooter }) {
    return (
        <div>
            <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
            <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
                <ModalHeader closeModal={closeModal} title={title} />
                <div className="h-full overflow-y-scroll grow mt-[20px]">
                    <form>
                        <div className="w-full flex  items-start px-[25px] my-[20px]">
                            <label className="w-1/3">Ảnh nhân viên</label>

                            <input
                                id="file"
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
                                <label>Tên</label>
                            </div>
                            <input type="text" placeholder="Nhập tên" className={`${styles.inputItem} `} />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Email</label>
                            </div>
                            <input type="email" placeholder="Nhập email" className={`${styles.inputItem}`} />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Mật khẩu</label>
                            </div>
                            <input type="text" placeholder="Nhập mật khẩu" className={`${styles.inputItem}`} />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>SĐT</label>
                            </div>
                            <input type="tel" placeholder="Nhập SĐT" className={`${styles.inputItem}`} />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Ngày sinh</label>
                            </div>
                            <input type="date" placeholder="Nhập ngày sinh" className={`${styles.inputItem}`} />
                        </div>

                        <div className={`${styles.item}`}>
                            <div className="w-1/3">
                                <label>Chức vụ</label>
                            </div>
                            <select className={`${styles.inputItem}`}>
                                <option>Nhân viên</option>
                                <option>Quản lý</option>
                            </select>
                        </div>
                    </form>
                </div>
                <ModalFooter title={titleBtnFooter} />
            </Drawer>
        </div>
    );
}
