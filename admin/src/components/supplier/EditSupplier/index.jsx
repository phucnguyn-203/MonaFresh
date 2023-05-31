import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../utils/yupGlobal";

import styles from "./styles.module.css";
import toastMessage from "../../../utils/toastMessage";
import { useState } from "react";
// import supplierAPI from "../../../api/supplierAPI";

export default function AddModalStaff({ closeModal, title, titleBtnFooter, handleUpdateSupplier, supplier }) {
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên nhà cung cấp"),
    email: yup.string().required("Vui lòng nhập Email nhà cung cấp ").email("Vui lòng nhập đúng định dạng của Email"),
    address: yup.string().required("Vui lòng nhập địa chỉ của nhà cung cấp"),
    phone: yup.string().required("Vui lòng nhập số điện thoại nhà cung cấp").typeError("Vui lòng nhập số"),
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
      setIsLoading(true);
      await handleUpdateSupplier(supplier._id, data);
      toastMessage({ type: "success", message: "Thêm sản phẩm thành công" });
    } catch (err) {
      toastMessage({ type: "error", message: "Thêm sản thất bại. Tên sản phẩm đã tồn tại" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed z-20`}></div>
      <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter} isFullWidth={false}>
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="h-full overflow-y-scroll grow mt-[20px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700">
                <label>Tên nhà cung cấp</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <input
                  defaultValue={supplier.name}
                  type="text"
                  placeholder="Nhập tên nhà cung cấp"
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
                  defaultValue={supplier.email}
                  type="text"
                  placeholder="Nhập thông tin liên hệ"
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
                <label>Địa chỉ nhà cung cấp</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <input
                  defaultValue={supplier.address}
                  type="text"
                  placeholder="Nhập địa chỉ nhà cung"
                  className={`${
                    errors.address ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-sm">{`*${errors.address.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700">
                <label>Số điện thoại</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <input
                  defaultValue={supplier.phone}
                  type="number"
                  placeholder="Nhập số điện thoại"
                  className={`${
                    errors.phone ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-sm">{`*${errors.phone.message}`}</p>}
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
