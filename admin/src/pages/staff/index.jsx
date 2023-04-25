import { IconAdd } from "../../components/icon";
import { IconDelete } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import StaffTable from "../../components/staff/StaffTable";

export default function Staff() {
    return (
        <PageLayout title="Nhân viên">
            <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
                <div className="p-4">
                    <div className="flex justify-end items-center py-3 gap-x-4">
                        <input
                            className="block w-full h-12 px-3 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent"
                            type="sreach"
                            name="sreach"
                            placeholder="Tìm theo tên nhân viên"
                        />
                        <select className="block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none">
                            <option>Nhân viên</option>
                            <option>Quản lý</option>
                        </select>
                        <button
                            className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white bg-red-300 cursor-not-allowed border border-transparent"
                        >
                            <span className="mr-2">
                                <IconDelete />
                            </span>
                            Xoá
                        </button>
                        <button
                            className="h-12 w-[500px] align-bottom inline-flex leading-5 items-center justify-center 
                        cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
                        text-white bg-primary border border-transparent hover:bg-emerald-700 "
                        >
                            <span className="mr-3">
                                <IconAdd />
                            </span>
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
            </div>
            <StaffTable />
        </PageLayout>
    );
}
