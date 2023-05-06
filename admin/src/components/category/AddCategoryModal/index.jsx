import React from "react";
import { useState } from "react";

import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import ToggleSwitch from "../../ToggleSwitch";
import yup from "../../../utils/yupGlobal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddCategoryModal({ closeModal, title, titleBtnFooter }) {
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
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <div className="p-6 flex-grow w-full max-h-full ">
              <div className="grid grid-cols-6 gap-3 mb-6">
                <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                  Tên danh mục
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <input
                    type="text"
                    placeholder="Tên danh mục"
                    className={`${
                      errors.name ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 focus:border-gray-600 border-[1px] focus:bg-transparent focus:outline-none`}
                    {...register("name")}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
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
