import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { IconUploadFile } from "../../icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../utils/yupGlobal";

import styles from "./styles.module.css";

export default function AddModalStaff({ closeModal, title, titleBtnFooter }) {
    const schema = yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên của bạn"),
        email: yup.string().required("Vui lòng nhập Email của bạn ").email("Vui lòng nhập đúng định dạng của Email"),
        password: yup.string().required("Vui lòng nhập mật khẩu của bạn"),
        phone: yup
            .string()
            .required("Vui lòng nhập số điện thoại của bạn")
            .phone("Vui lòng nhập đúng định dạng số điện thoại"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
            <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
                <ModalHeader closeModal={closeModal} title={title} />
                <div className="h-full overflow-y-scroll grow mt-[20px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full  flex  items-start px-[25px] my-[20px]">
                            <label className="w-1/3 text-sm text-gray-700">Ảnh nhân viên</label>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                            />
                            <label htmlFor="file" className="grow">
                                <div className="px-6 pt-5 pb-6 border-[1px] border-gray-300 border-dashed rounded-md cursor-pointer flex flex-col items-center">
                                    <span>
                                        <IconUploadFile />
                                    </span>

                                    <p>Thêm ảnh tại đây</p>
                                    <em>(Chỉ nhận ảnh có đuôi *.jpeg and *.png )</em>
                                </div>
                            </label>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Tên</label>
                            </div>
                            <div className="flex flex-col w-2/3 ">
                                <input
                                    type="text"
                                    placeholder="Nhập tên"
                                    className={`  ${
                                        errors.name ? "border-red-500" : ""
                                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
                            </div>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Email</label>
                            </div>
                            <div className="flex flex-col w-2/3 ">
                                <input
                                    type="email"
                                    placeholder="Nhập email"
                                    className={`${
                                        errors.email ? "border-red-500" : ""
                                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{`*${errors.email.message}`}</p>}
                            </div>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Mật khẩu</label>
                            </div>
                            <div className="flex flex-col w-2/3 ">
                                <input
                                    type="text"
                                    placeholder="Nhập mật khẩu"
                                    className={`${
                                        errors.password ? "border-red-500" : ""
                                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>
                                )}
                            </div>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>SĐT</label>
                            </div>
                            <div className="flex flex-col w-2/3 ">
                                <input
                                    type="tel"
                                    placeholder="Nhập SĐT"
                                    className={`${
                                        errors.phone ? "border-red-500" : ""
                                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                                    {...register("phone")}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{`*${errors.phone.message}`}</p>}
                            </div>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Chức vụ</label>
                            </div>
                            <div className="flex flex-col w-2/3 ">
                                <select className="block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none">
                                    <option>Nhân viên</option>
                                    <option>Quản lý</option>
                                </select>
                            </div>
                        </div>
                        <input type="submit" hidden id="send" />
                    </form>
                </div>
                <ModalFooter title={titleBtnFooter} />
            </Drawer>
        </div>
    );
}
