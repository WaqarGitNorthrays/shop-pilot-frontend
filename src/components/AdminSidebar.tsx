import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

export const AdminSidebar = () => {
  const { user, logoutUser, loading, error } = useAuthStore();

  const handleLogout = () => {
    if (user?._id) {
      logoutUser(user._id);
    } else {
      // Fallback in case user ID is not available
      logoutUser('');
    }
  }
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen border-r bg-card">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="text-xl font-bold">ShopPilot</span>
        </Link>
      </div>

      <nav className="space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-3 right-3 space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
