
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ShieldAlert,
  FileSearch,
  Database,
  Settings,
  BarChart3,
  Search,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/'
    },
    {
      title: 'Upload & Analyze',
      icon: <ShieldAlert className="w-5 h-5" />,
      href: '/analyze'
    },
    {
      title: 'Case Files',
      icon: <FileSearch className="w-5 h-5" />,
      href: '/cases'
    },
    {
      title: 'Evidence Database',
      icon: <Database className="w-5 h-5" />,
      href: '/database'
    },
    {
      title: 'Search',
      icon: <Search className="w-5 h-5" />,
      href: '/search'
    }
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between px-4 h-16">
        {!isCollapsed && (
          <div className="flex items-center">
            <ShieldAlert className="w-8 h-8 text-sidebar-foreground" />
            <span className="ml-2 font-bold text-xl text-sidebar-foreground">DFDS</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex-1 pt-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center py-3 px-4 mb-1 mx-2 rounded-md transition-colors",
              location.pathname === item.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-70"
            )}
          >
            <span>{item.icon}</span>
            {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        {!isCollapsed && (
          <div className="flex items-center px-4 py-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-foreground font-medium">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-sidebar-foreground opacity-70">Digital Forensics</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed ? "px-0" : ""
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed ? "px-0" : ""
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
