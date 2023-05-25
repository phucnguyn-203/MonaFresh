import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Drawer, ModalHeader, ModalFooter } from "../../modal";
import { IconClose } from "../../icon";
import toastMessage from "../../../utils/toastMessage";
import Loading from "../../loading";
import yup from "../../../utils/yupGlobal";
import categoryAPI from "../../../api/categoryAPI";
import uploadFileApi from "../../../api/uploadFileApi";
import supplierAPI from "../../../api/supplierAPI";
import createImageFileObjectFromUrl from "../../../utils/createFileObjectFromUrl";
import styles from "./styles.module.css";
import TextEditor from "../TextEditor";

export default function EditProductModal({ closeModal, product, title, titleBtnFooter, handleUpdateProduct }) {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên sản phẩm"),
    category: yup.string().required("Vui lòng chọn danh mục cho sản phẩm"),
    description: yup.string().default("Đang cập nhật"),
    price: yup
      .number()
      .typeError("Vui lòng nhập giá sản phẩm")
      .test("price-greater-than-importPrice", "Giá bán sản phẩm phải cao hơn giá nhập sản phẩm", function (value) {
        const importPrice = this.parent.importPrice;
        return value > importPrice;
      }),
    importPrice: yup.number().typeError("Vui lòng nhập giá nhập sản phẩm").required("Vui lòng nhập giá nhập"),
    quantity: yup.number().default(0),
    percentageDiscount: yup
      .number()
      .typeError("Vui lòng nhập đúng định dạng của giá trị")
      .min(0, "Giá trị nên lớn hơn hoặc bằng 0")
      .max(100, "Giá trị nên nhỏ hơn hoặc bằng 100")
      .default(0),
    supplier: yup.string().required("Vui lòng chọn danh mục cho sản phẩm"),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: product.category._id,
      supplier: product.supplier?._id,
    },
  });
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [supplier, setSupplier] = useState([]);

  console.log(product.images);
  console.log(images);
  console.log(product.category);
  console.log(product.supplier);

  useEffect(() => {
    getAllCategory();
    getAllSupplier();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsImageLoading(true);
        const newImages = await Promise.all(
          product.images?.map(async (image) => {
            return await createImageFileObjectFromUrl(image);
          }),
        );
        setImages([...images, ...newImages]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsImageLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleUploadThumnail = async () => {
    const formData = new FormData();
    formData.append("file", thumbnail);
    return await uploadFileApi.uploadSingleFile(formData);
  };

  const handleUploadImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    return await uploadFileApi.uploadMutipleFile(formData);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const promises = [];
      if (thumbnail) {
        promises.push(
          handleUploadThumnail().then((uploadAvatar) => {
            data.thumbnail = uploadAvatar.url;
          }),
        );
      }
      promises.push(
        handleUploadImages().then((uploadImagesProduct) => {
          data.images = [...uploadImagesProduct.urls];
        }),
      );

      await Promise.all(promises);
      if (description) {
        data.description = description;
      }
      await handleUpdateProduct(product._id, data);
      toastMessage({ type: "success", message: "Cập nhật thành công" });
    } catch (err) {
      toastMessage({ type: "error", message: "Cập nhật thất bại. Tên sản phẩm đã tồn tại" });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategory();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllSupplier = async () => {
    try {
      const response = await supplierAPI.getAllSupplier();
      setSupplier(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImgInPreviewList = (productIndex) => {
    const newImages = images.filter((image, index) => index !== productIndex);
    setImages(newImages);
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
                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Thumbnail sản phẩm
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <div className="w-full text-center">
                    <input
                      type="file"
                      hidden
                      id="file"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files[0])}
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
                        <em className="text-xs text-gray-400">(Chỉ nhận file ảnh *.jpeg và *.png)</em>
                      </div>
                    </label>
                    <Link
                      to={thumbnail ? URL.createObjectURL(thumbnail) : product.thumbnail}
                      target="_blank"
                      className="inline-block mt-5"
                    >
                      <div className="w-[150px] h-[150px] border rounded-md border-gray-100 p-2">
                        <img
                          src={thumbnail ? URL.createObjectURL(thumbnail) : product.thumbnail}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
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
                      multiple="multiple"
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
                    <div className="mt-[15px]">
                      {isImageLoading ? (
                        <div className="flex justify-center">
                          <Loading size={30} />
                        </div>
                      ) : (
                        <ul className="grid grid-cols-4">
                          {images.map((image, index) => (
                            <li className="relative" key={URL.createObjectURL(image)}>
                              <Link to={URL.createObjectURL(image)} target="_blank" className="inline-block mt-5">
                                <div className="w-[150px] h-[150px] border rounded-md border-gray-100 p-2">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt="photo"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div
                                  className={`${styles.deleteIcon}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteImgInPreviewList(index);
                                  }}
                                >
                                  <IconClose />
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none ${
                          errors.category ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Danh mục</option>
                        {categories.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.category && <p className="text-red-500 text-sm">{`*${errors.category.message}`}</p>}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Nhà cung cấp sản phẩm
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <Controller
                    control={control}
                    name="supplier"
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none ${
                          errors.supplier ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Nhà cung cấp</option>
                        {supplier.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.supplier && <p className="text-red-500 text-sm">{`*${errors.supplier.message}`}</p>}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Mô tả
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <TextEditor
                    data={product.description}
                    handleChangeData={(editor) => setDescription(editor.getData())}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Giá bán
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
                  Giá nhập
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <input
                    defaultValue={product.importPrice}
                    type="number"
                    placeholder="Nhập giá nhập sản phẩm"
                    className={`${
                      errors.importPrice ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("importPrice")}
                  />
                  {errors.importPrice && <p className="text-red-500 text-sm">{`*${errors.importPrice.message}`}</p>}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Khuyến mãi
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <input
                    defaultValue={product.percentageDiscount * 100}
                    type="number"
                    placeholder="Khuyến mãi (20%)"
                    className={`${
                      errors.percentageDiscount ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("percentageDiscount")}
                  />
                  {errors.percentageDiscount && (
                    <p className="text-red-500 text-sm">{`*${errors.percentageDiscount.message}`}</p>
                  )}
                </div>
              </div>
            </div>
            <input type="submit" hidden id="send" disabled={isLoading} />
          </form>
        </div>
        <ModalFooter title={titleBtnFooter} isLoading={isLoading} />
      </Drawer>
    </div>
  );
}
