import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdNotifications } from "react-icons/md";
import { useGetAllNotificationQuery } from "../../redux/api/notificationApi";

const Notification = () => {
  const { data, isLoading } = useGetAllNotificationQuery();

  // dismissed IDs stored locally — keeps UX clean without needing a delete endpoint
  const [dismissedIds, setDismissedIds] = useState([]);

  const handleDismiss = (id) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  const allNotifications = (data?.data || []).filter(
    (n) => !dismissedIds.includes(n._id),
  );

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "—", time: "—" };
    const d = new Date(isoString);
    const date = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  if (isLoading) {
    return (
      <div className="py-4 max-h-[70vh] overflow-y-auto space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-3 bg-white border rounded-lg mb-3 animate-pulse"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4 overflow-y-auto">
      {allNotifications.length > 0 ? (
        allNotifications.map((notification) => {
          const { date, time } = formatDateTime(notification.createdAt);
          const avatarIndex = (notification._id?.charCodeAt(0) % 50) + 1;
          return (
            <div
              key={notification._id}
              className={`relative p-3 bg-white border rounded-lg mb-3 transition-all ${
                !notification.isRead ? "border-l-4 border-l-[#14803c]" : ""
              }`}
            >
              <button
                onClick={() => handleDismiss(notification._id)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
                aria-label="Dismiss notification"
              >
                <RxCross2 className="w-4 h-4 text-gray-400" />
              </button>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d3e8e6] flex items-center justify-center flex-shrink-0">
                  <MdNotifications className="w-5 h-5 text-[#14803c]" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="inline-block w-2 h-2 rounded-full bg-[#14803c] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {date} • {time}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 py-10">No notifications.</p>
      )}
    </div>
  );
};

export default Notification;
