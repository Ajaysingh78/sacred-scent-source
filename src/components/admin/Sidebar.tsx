// src/components/admin/Sidebar.tsx
// CHANGE: Added HardHat icon import + 'labor' menu item in menuItems array
// Everything else is UNCHANGED

import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, FileText, Calendar, MessageSquare, LogOut, User, HardHat } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

const Sidebar = ({ activeTab, setActiveTab, user }: SidebarProps) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'queries', label: 'Queries', icon: MessageSquare },
    { id: 'labor', label: 'Labor Management', icon: HardHat }, // ← NEW LINE ADDED
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold">N</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">Namami Enterprises</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.name || 'Admin'} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30' 
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:animate-pulse" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t border-gray-700">
        <p className="text-xs text-gray-500">
          © 2026 Namami Enterprises
        </p>
      </div>
    </div>
  );
};

export default Sidebar;