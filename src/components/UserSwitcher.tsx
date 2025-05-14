'use client';

import { useAppContext } from '@/context/AppContext';

export function UserSwitcher() {
  const { users, currentUser, switchUser } = useAppContext();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
          {currentUser.name[0]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {currentUser.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
      </div>
      <div className="inline-flex items-center">
        <select
          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          value={currentUser.id}
          onChange={(e) => switchUser(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 