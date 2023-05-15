import Loading from "../../loading";

export default function ModalFooter({ title, isLoading }) {
  return (
    <div className="flex items-center justify-center  h-[100px] bottom-0 bg-[#F9FAFB] p-[20px] ">
      <label
        htmlFor="send"
        className={`${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        } bg-primary text-white h-[48px] w-[250px] text-lg font-semibold rounded-md text-center flex justify-center items-center`}
      >
        {isLoading ? <Loading size={30} /> : title}
      </label>
    </div>
  );
}
