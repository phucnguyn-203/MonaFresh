export function ManageItem({ icon, title, value, backgroundColor, iconColor }) {
    return (
        <div className="flex w-1/4 p-4 items-center border border-gray-200 rounded-lg  ">
            <div className={`${backgroundColor} flex justify-center p-3 mr-4 text-lg  rounded-full`}>
                <div className={`${iconColor} w-[18px] h-[18px]`}>{icon}</div>
            </div>
            <div>
                <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold leading-none text-gray-600">{value}</p>
            </div>
        </div>
    );
}
