import { useState } from "react";
import PageLayout from "../../components/layout/pageLayout";
import AddModalStaff from "../../components/staff/AddModalStaff";
import EditModalStaff from "../../components/staff/EditModalStaff";

export default function Staff() {
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShowStaffModal = () => {
        setShow(!show);
    };
    const handleShowEditStaffModal = () => {
        setShowEditModal(!showEditModal);
    };
    const data = [
        {
            name: "Võ Hồng Nguyên",
            email: "vohongnguyen@gmail.com",
            sdt: "0123456789",
        },
        {
            name: "Nguyễn Hoàng Phúc",
            email: "hoangphuc@gmail.com",
            sdt: "024683579",
        },
    ];

    return (
        <PageLayout title="Nhân viên">
            <button onClick={handleShowStaffModal} className="cursor-pointer ">
                Thêm nhân viên
            </button>
            <br></br>
            <button onClick={handleShowEditStaffModal} className="cursor-pointer ">
                Edit
            </button>
            {show && (
                <AddModalStaff closeModal={handleShowStaffModal} title={"THÊM NHÂN VIÊN"} titleBtnFooter={"THÊM"} />
            )}
            {showEditModal && (
                <EditModalStaff
                    closeModal={handleShowEditStaffModal}
                    title={"CHỈNH SỬA NHÂN VIÊN"}
                    titleBtnFooter={"CẬP NHẬT"}
                    data={data[1]}
                />
            )}
        </PageLayout>
    );
}
