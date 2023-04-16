import { IconClose } from "../../icon";

export default function ModalHeader({ title, closeModal }) {
    return (
        <div className="flex items-center justify-between p-[20px] h-[100px] bg-[#F9FAFB] shadow">
            <h1 className="text-xl font-semibold ">{title}</h1>

            <button
                onClick={closeModal}
                className="cursor-pointer p-[10px] bg-[red] rounded-full shadow-2xl text-[#fff] text-xl font-bold hover:opacity-60"
            >
                <IconClose />
            </button>
        </div>
    );
}
