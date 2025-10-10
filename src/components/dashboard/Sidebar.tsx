"use client";
import Image, { StaticImageData } from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LogOutIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SettingsIcon
} from 'lucide-react';
import { useState } from 'react';
import mosque from "../../../public/mosque.png";
import home from "../../../public/home.png";
import payment from "../../../public/payment.png";
import visitors from "../../../public/visitors.png";
import request from "../../../public/request.png";
import { ComponentType, SVGProps } from "react";
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

// Define type for nav item
type NavItem =
  | { name: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>>; type: "icon" }
  | { name: string; href: string; icon: StaticImageData; type: "image" };

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { admin, logout } = useAuthStore();

  const navItems: NavItem[] = [
    { name: 'Home', href: '/dashboard', icon: home, type: "image" },
    { name: 'Visitors', href: '/dashboard/visitors', icon: visitors, type: "image" },
    { name: 'List of Mosques', href: '/dashboard/mosques', icon: mosque, type: "image" },
    { name: 'Request for Mosques', href: '/dashboard/requests', icon: request, type: "image" },
    { name: 'Payment', href: '/dashboard/payment', icon: payment, type: "image" },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <aside className="w-64 h-screen bg-primary shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">NBJ Admin</h1>
            <p className="text-white/70 text-sm">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                 prefetch={true} // Enable prefetching
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  pathname === item.href 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.type === "icon" ? (
                  <item.icon className="h-5 w-5 mr-3" />
                ) : (
                  <Image 
                    src={item.icon} 
                    alt={item.name} 
                    className="h-5 w-5 mr-3 filter brightness-0 invert"
                    priority={item.href === '/dashboard'} // Prioritize home icon
                  />
                )}
                <span className="font-medium">{item.name}</span>
                {pathname === item.href && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile & Logout Section */}
      <div className="p-4 border-t border-white/20">
        {/* Profile Toggle */}
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">A</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">{admin?.email || 'Admin User'}</p>
              <p className="text-xs text-white/70">Administrator</p>
            </div>
          </div>
          {isProfileOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="mt-2 bg-white/5 rounded-xl overflow-hidden">
            {/* Logout Toggle */}
            <button
              onClick={() => setIsLogoutOpen(!isLogoutOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center">
                <LogOutIcon className="h-4 w-4 mr-3" />
                <span className="text-sm">Logout</span>
              </div>
              {isLogoutOpen ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>

            {/* Logout Confirmation */}
            {isLogoutOpen && (
              <div className="bg-white/10 p-3">
                <p className="text-xs text-white/80 mb-2">Are you sure you want to logout?</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsLogoutOpen(false)}
                    className="flex-1 px-3 py-1 text-xs bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-3 py-1 text-xs bg-red-500/80 text-white rounded hover:bg-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}


