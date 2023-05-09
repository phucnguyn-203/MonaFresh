import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import yup from "../../utils/yupGlobal";

export default function UpdatePassword({ handleUpdatePassword }) {
  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    passwordConfirm: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu mới")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không trùng khớp"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    handleUpdatePassword(data);
  };

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 mt-9 flex-grow w-full max-h-full ">
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Mật khẩu cũ
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={`${
                  errors.password ? "border-red-500" : ""
                } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={` ${
                  errors.newPassword ? "border-red-500" : ""
                } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                {...register("newPassword")}
              />
              {errors.newPassword && <p className="text-red-500 text-sm">{`*${errors.newPassword.message}`}</p>}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Xác nhận mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={`${
                  errors.passwordConfirm ? "border-red-500" : ""
                } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm ">{`*${errors.passwordConfirm.message}`}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse pr-6 pb-6">
          <button
            onClick={() => handleUpdatePassword}
            type="submit"
            className="align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#0E9F6E] border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 h-12 "
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
