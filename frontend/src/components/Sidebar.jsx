import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300 bg-white dark:bg-gray-900">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
          <Users className="size-6" />
          <span className="font-semibold text-lg">Contacts</span>
        </div>
        {/* Online filter toggle - visible on all screen sizes */}
        <div className="mt-4 flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm accent-indigo-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Show online only
            </span>
          </label>
          <span className="text-xs text-indigo-500 font-semibold">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200 dark:scrollbar-thumb-indigo-700 dark:scrollbar-track-gray-700">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3 rounded-md
                hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors
                ${selectedUser?._id === user._id ? "bg-indigo-200 dark:bg-indigo-900 ring-2 ring-indigo-400" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full border-2 border-indigo-300 dark:border-indigo-600"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-white dark:ring-gray-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-semibold truncate text-gray-800 dark:text-gray-100">{user.fullName}</div>
                <div className={`text-sm ${onlineUsers.includes(user._id) ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
