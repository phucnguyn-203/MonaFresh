export default function NotificationList() {
  return (
    <div className="relative ml-[-300px] z">
      <div className="absolute w-[300px]  top-[100%] bg-gray-50 shadow-xl rounded-lg flex flex-col left-0 overflow-hidden">
        <div className="relative w-full h-full ">
          <div className="mr-0 ml-0">
            <div className="w-[320px]  box-border border">
              <ul className="block text-sm border-t border-gray-100 rounded-md">
                <li className="flex justify-between items-center font-serif font-normal text-sm py-3 px-3 border-b border-gray-100 hover:border-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 cursor-pointer">
                  <div className="flex items-center">
                    <div className="relative rounded-full inline-block w-8 h-8 p-1 mr-2 bg-gray-50 border border-gray-200">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://i.postimg.cc/tCsSNSxS/Yellow-Sweet-Corn-Bag-each.jpg"
                        alt="notification image"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner"></div>
                    </div>
                    <div className="pl-2">
                      <h6 className="font-medium text-gray-500">Nguyễn Thị Thuỳ An đã đặt hàng</h6>
                      <p className="flex items-center text-xs text-gray-400">
                        <span className="pl-11">Dec 12 2021 - 12:40PM</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="flex justify-between items-center font-serif font-normal text-sm py-3 px-3 border-b border-gray-100 hover:border-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 cursor-pointer">
                  <div className="flex items-center">
                    <div className="relative rounded-full inline-block w-8 h-8 p-1 mr-2 bg-gray-50 border border-gray-200">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://i.postimg.cc/tCsSNSxS/Yellow-Sweet-Corn-Bag-each.jpg"
                        alt="notification image"
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner"></div>
                    </div>
                    <div className="pl-2">
                      <h6 className="font-medium text-gray-500">Nguyễn Thị Thuỳ An đã đặt hàng</h6>
                      <p className="flex items-center text-xs text-gray-400">
                        <span className="pl-11">Dec 12 2021 - 12:40PM</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
