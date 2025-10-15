import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
