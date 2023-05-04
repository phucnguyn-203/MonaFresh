import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../utils/yupGlobal";
import styles from "../MyProfile/styles.module.css";

export default function UpdatePassword() {
  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newpassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    cpassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu mới")
      .oneOf([yup.ref("newpassword")], "Mật khẩu không trùng khớp"),
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
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 mt-9 flex-grow w-full max-h-full ">
          <div className=" w-full h-[100px] border-b-[1px] border-[#ececec] pt-[30px] pb-[20px]">
            <div className="w-full uppercase text-[18px] font-[600]">
              Cập nhật mật khẩu
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6 pt-6">
            <label className="block  text-gray-400 dark:text-gray-400 col-span-4 sm:col-span-2  text-sm">
              Mật khẩu cũ
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={` ${errors.password ? "border-red-500" : ""} ${
                  styles.input
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm italic">{`*${errors.password.message}`}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-400 dark:text-gray-400 col-span-4 sm:col-span-2  text-sm">
              Mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={` ${errors.newpassword ? "border-red-500" : ""} ${
                  styles.input
                }`}
                {...register("newpassword")}
              />
              {errors.newpassword && (
                <p className="text-red-500 text-sm italic">{`*${errors.newpassword.message}`}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-400 dark:text-gray-400 col-span-4 sm:col-span-2  text-sm">
              Xác nhận mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={`${errors.cpassword ? "border-red-500" : ""} ${
                  styles.input
                }`}
                {...register("cpassword")}
              />
              {errors.cpassword && (
                <p className="text-red-500 text-sm italic ">{`*${errors.cpassword.message}`}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse pr-6 pb-6">
          <button className="align-bottom uppercase inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#6abd45] border border-transparent active:bg-green-600 hover:bg-[#5faf3d] focus:ring focus:ring-purple-300 h-12 ">
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
