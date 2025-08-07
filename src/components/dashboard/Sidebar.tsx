'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon, BuildingLibraryIcon, InboxIcon } from '@heroicons/react/24/outline';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Subscribed Visitors', href: '/dashboard/visitors', icon: UsersIcon },
    { name: 'List of Mosques', href: '/dashboard/mosques', icon: BuildingLibraryIcon },
    { name: 'Request for Mosques', href: '/dashboard/requests', icon: InboxIcon },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-sm border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 h-16 flex items-center">
        <h1 className="text-xl font-semibold text-primary">Mosque Admin</h1>
      </div>
      <nav className="p-4 h-[calc(100vh-64px)] overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg ${
                  pathname === item.href 
                    ? 'bg-primary bg-opacity-10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}