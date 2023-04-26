import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { useState } from "react";
import styles from "./styles.module.css";
import yup from "../../../utils/yupGlobal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddModalProduct({ closeModal, title, titleBtnFooter }) {
    const [avatar, setAvatar] = useState();
    const [images, setImages] = useState([]);

    const schema = yup.object().shape({
        name: yup.string().required("Vui lòng nhập tên sản phẩm"),
        decrip: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
        price: yup.string().required("Vui lòng nhập giá sản phẩm"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => console.log(data);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setAvatar(file);
    };
    return (
        <div>
            <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
            <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
                <ModalHeader closeModal={closeModal} title={title} />
                <div className="h-full overflow-y-scroll grow mt-[20px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6 flex-grow w-full max-h-full ">
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Thumbnail sản phẩm
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <div className="w-full text-center">
                                        <input
                                            type="file"
                                            hidden
                                            id="file"
                                            accept="image/*"
                                            onChange={handlePreviewAvatar}
                                        />
                                        <label htmlFor="file">
                                            <div className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                                                <span className="mx-auto flex justify-center">
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-3xl text-green-500"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                        <line x1="12" y1="12" x2="12" y2="21"></line>
                                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                    </svg>
                                                </span>
                                                <p className="text-sm mt-2">Tải ảnh lên tại đây</p>
                                                <em className="text-xs text-gray-400">
                                                    (Chỉ nhận file ảnh *.jpeg và *.png)
                                                </em>
                                            </div>
                                        </label>
                                        <div>
                                            {avatar && (
                                                <img
                                                    src={avatar.preview}
                                                    className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Ảnh sản phẩm
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <div className="w-full text-center">
                                        <input
                                            type="file"
                                            hidden
                                            id="files"
                                            accept="image/*"
                                            onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
                                        />
                                        <label htmlFor="files">
                                            <div className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                                                <span className="mx-auto flex justify-center">
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-3xl text-green-500"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                        <line x1="12" y1="12" x2="12" y2="21"></line>
                                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                    </svg>
                                                </span>
                                                <p className="text-sm mt-2">Tải ảnh lên tại đây</p>
                                                <em className="text-xs text-gray-400">
                                                    (Chỉ nhận file ảnh *.jpeg và *.png)
                                                </em>
                                            </div>
                                        </label>
                                        <div>
                                            <ul>
                                                {images.map((image) => (
                                                    <img
                                                        key={image.name}
                                                        src={URL.createObjectURL(image)}
                                                        className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Tên sản phẩm
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <input
                                        type="text"
                                        placeholder="Tên sản phẩm"
                                        className={`${
                                            errors.name ? "border-red-500" : ""
                                        } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Danh mục sản phẩm
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <select className={`${styles.inputItem}`}>
                                        <option>Rau củ</option>
                                        <option>Hải sản</option>
                                        <option>Trái cây</option>
                                        <option>Đồ uống</option>
                                        <option>Đồ khô</option>
                                        <option>Thịt trưng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Mô tả
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <textarea
                                        type="text"
                                        placeholder="Mô tả chi tiết sản phẩm"
                                        className={`${
                                            errors.decrip ? "border-red-500" : ""
                                        } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                                        {...register("decrip")}
                                    />
                                    {errors.decrip && (
                                        <p className="text-red-500 text-sm">{`*${errors.decrip.message}`}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Giá sản phẩm
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <input
                                        type="text"
                                        placeholder="Nhập giá sản phẩm"
                                        className={`${
                                            errors.price ? "border-red-500" : ""
                                        } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                                        {...register("price")}
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm">{`*${errors.price.message}`}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-6">
                                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                                    Khuyến mãi
                                </label>
                                <div className="col-span-8 sm:col-span-4 ">
                                    <input
                                        type="text"
                                        placeholder="Khuyến mãi %"
                                        className=" block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <input type="submit" hidden id="send" />
                    </form>
                    {/* <form onSubmit={handleSubmit}>
                        <div className="w-full flex  items-start px-[25px] my-[20px]">
                            <label className="w-1/3 text-sm text-gray-700">Thumbnail sản phẩm</label>
                            <div className="w-2/3">
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                                    onChange={handlePreviewAvatar}
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
                                <div>
                                    {avatar && (
                                        <img
                                            src={avatar.preview}
                                            className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex  items-start px-[25px] my-[20px]">
                            <label className="w-1/3 text-sm text-gray-700">Ảnh sản phẩm</label>

                            <div className="w-2/3">
                                <input
                                    id="files"
                                    type="file"
                                    accept="image/*"
                                    className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                                    onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
                                    // onChange={handlePreviewAvatar}
                                />
                                <label htmlFor="files" className="grow">
                                    <div className="px-6 pt-5 pb-6 border-[1px] border-gray-300 border-dashed rounded-md cursor-pointer flex flex-col items-center">
                                        <span>
                                            <IconUploadFile />
                                        </span>

                                        <p>Thêm ảnh tại đây</p>
                                        <em>(Chỉ nhận ảnh có đuôi *.jpeg and *.png )</em>
                                    </div>
                                </label>
                                <div>
                                    <ul>
                                        {images.map((image) => (
                                            <img
                                                key={image.name}
                                                src={URL.createObjectURL(image)}
                                                className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Tên sản phẩm</label>
                            </div>
                            <div className="flex flex-col w-2/3">
                                <input
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    className={`${
                                        errors.name ? "border-red-500" : ""
                                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none `}
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
                            </div>
                        </div>

                        <div className={`${styles.item} `}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Danh mục</label>
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
                            <div className="w-1/3 py-[10px] text-sm text-gray-700">
                                <label>Mô tả</label>
                            </div>
                            <textarea
                                type="text"
                                placeholder="Nhập mô tả chi tiết"
                                className={`${styles.descriptionInputItem}`}
                            />
                        </div>
                        <div className={`${styles.item} `}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Giá</label>
                            </div>
                            <input type="number" placeholder="Nhập giá sản phẩm" className={`${styles.inputItem}`} />
                        </div>
                        <div className={`${styles.item}`}>
                            <div className="w-1/3 text-sm text-gray-700">
                                <label>Khuyến mãi</label>
                            </div>
                            <input type="number" placeholder="Nhập khuyến mãi(%)" className={`${styles.inputItem}`} />
                        </div>
                        <input type="submit" hidden id="send" />
                    </form> */}
                </div>
                <ModalFooter title={titleBtnFooter} />
            </Drawer>
        </div>
    );
}
