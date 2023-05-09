import React, { useEffect } from "react";
import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { useState } from "react";
import yup from "../../../utils/yupGlobal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import categoryAPI from "../../../api/categoryAPI";
import productAPI from "../../../api/productAPI";

export default function AddModalProduct({ closeModal, product, title, titleBtnFooter, handleAddProduct }) {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [previewThumbnailURL, setPreviewThumbnailURL] = useState();

  const handleThumnailChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    setPreviewThumbnailURL(URL.createObjectURL(file));
  };

  const handleThumnailUpload = async () => {
    const formData = new FormData();
    formData.append("file", thumbnail);
    return await productAPI.uploadThumbnail(formData);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên sản phẩm"),
    category: yup.string().required("Vui lòng chọn danh mục cho sản phẩm"),
    description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
    price: yup.number().required("Vui lòng nhập giá sản phẩm"),
    quantity: yup.number().required("Vui lòng nhập số lượng sản phẩm"),
    percentageDiscount: yup.number().default(0),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const uploadDataResponse = await handleThumnailUpload();
      const photoUrl = uploadDataResponse.url;
      data.thumbnail = photoUrl;
      handleAddProduct(product._id, data);
    } catch (err) {}
  };

  const showAllCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategory();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showAllCategory();
  }, []);

  return (
    <div>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="h-full overflow-y-scroll grow mt-[20px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 flex-grow w-full max-h-full ">
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Thumbnail sản phẩm
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <div className="w-full text-center">
                    <input type="file" hidden id="file" accept="image/*" onChange={handleThumnailChange} />
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
                        <em className="text-xs text-gray-400">(Chỉ nhận file ảnh *.jpeg và *.png)</em>
                      </div>
                    </label>
                    <div>
                      <img
                        src={previewThumbnailURL ? previewThumbnailURL : product.thumbnail}
                        className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                        alt="thubnail"
                      />
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
                        <em className="text-xs text-gray-400">(Chỉ nhận file ảnh *.jpeg và *.png)</em>
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
                    defaultValue={product.name}
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
                  <select
                    className={`block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none ${
                      errors.category ? "border-red-500" : ""
                    }`}
                    {...register("category")}
                  >
                    <option value="">Danh mục</option>
                    {categories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm">{`*${errors.category.message}`}</p>}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Mô tả
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <textarea
                    defaultValue={product.description}
                    type="text"
                    placeholder="Mô tả chi tiết sản phẩm"
                    className={`${
                      errors.description ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("description")}
                  />
                  {errors.description && <p className="text-red-500 text-sm">{`*${errors.description.message}`}</p>}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Giá sản phẩm
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <input
                    defaultValue={product.price}
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    className={`${
                      errors.price ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("price")}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{`*${errors.price.message}`}</p>}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Số lượng sản phẩm
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <input
                    defaultValue={product.quantity}
                    type="number"
                    placeholder="Nhập số lượng sản phẩm"
                    className={`${
                      errors.quantity ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("quantity")}
                  />
                  {errors.quantity && <p className="text-red-500 text-sm">{`*${errors.quantity.message}`}</p>}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Khuyến mãi
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <input
                    defaultValue={product.percentageDiscount}
                    type="number"
                    placeholder="Khuyến mãi %"
                    className={`block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("percentageDiscount")}
                  />
                </div>
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
