
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get the page title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/analyze':
        return 'Upload & Analyze';
      case '/cases':
        return 'Case Files';
      case '/database':
        return 'Evidence Database';
      case '/search':
        return 'Search';
      default:
        return 'Deepfake Detection System';
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
      <div>
        <h1 className="text-xl font-bold">{getTitle()}</h1>
        <p className="text-sm text-muted-foreground">Secure Law Enforcement Digital Forensics Tool</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Quick search..."
            className="w-[200px] pl-8 bg-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
