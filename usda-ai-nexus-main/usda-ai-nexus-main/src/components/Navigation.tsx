import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, FolderOpen, ClipboardList, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/add-use-case', label: 'Add Use Case', icon: PlusCircle },
    { to: '/all-use-cases', label: 'All Use Cases', icon: FolderOpen },
    { to: '/audit-log', label: 'Audit Log', icon: ClipboardList },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border card-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <span className="text-lg font-semibold text-foreground hidden sm:block">USDA AI Inventory</span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label.split(' ')[0]}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
