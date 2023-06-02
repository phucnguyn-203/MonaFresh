import { Link } from "react-router-dom";
import { fetchNotification } from "../../../features/auth/notificationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import notificationAPI from "../../../api/notificationAPI";
import formatTimestamp from "../../../utils/formatTimestamp";

export default function NotificationItem({ data }) {
  const dispatch = useDispatch();

  const handleClickNotification = async (id) => {
    try {
      await notificationAPI.updateNotification(id);
      unwrapResult(await dispatch(fetchNotification()));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Link
      to={`/customers/${data.customer._id}`}
      onClick={() => handleClickNotification(data._id)}
      className={`${
        data.unread ? "bg-gray-200" : "bg-white"
      } flex justify-between items-center text-sm py-3 px-3 border-b border-gray-100 hover:border-gray-700 transition-colors duration-150  hover:text-gray-800 cursor-pointer`}
    >
      <div className="flex items-center">
        <div className="relative rounded-full inline-block w-8 h-8 p-1 mr-2 bg-gray-50 border border-gray-200">
          <img className="object-cover w-full h-full rounded-full" src={data.customer.photo} alt="notification image" />
          <div className="absolute inset-0 rounded-full shadow-inner"></div>
        </div>
        <div className="pl-2">
          <h6 className="font-medium text-gray-500">{data.content}</h6>
          <p className="text-xs text-gray-400">
            <span>{formatTimestamp(data.createdAt)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
