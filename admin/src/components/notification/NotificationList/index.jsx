import NotificationItem from "../NotificationItem";

export default function NotificationList({ notifications = [] }) {
  return (
    <div className="relative ml-[-300px]">
      <div className="absolute w-[320px] max-h-[400px] top-[100%] bg-white shadow-xl rounded-lg flex flex-col left-0 overflow-hidden">
        <div className="relative">
          <div className="mr-0 ml-0">
            <div className="box-border border">
              <ul className="block text-sm border-t border-gray-100 rounded-md">
                {notifications.map((item) => (
                  <NotificationItem key={item._id} data={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
