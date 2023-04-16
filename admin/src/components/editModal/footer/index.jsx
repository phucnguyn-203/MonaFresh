export default function ModalFooter({ title }) {
    return (
        <div className="flex items-center justify-center  h-[100px] bottom-0 bg-[#F9FAFB] p-[20px] ">
            <button className="bg-[#0E9F6E] text-white h-[48px] w-[250px] cursor-pointer text-lg font-semibold rounded-md hover:bg-[#098058]">
                {title}
            </button>
        </div>
    );
}
