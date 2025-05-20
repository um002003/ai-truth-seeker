
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <ShieldAlert className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">404: Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The resource you're looking for doesn't exist or you don't have permission to access it.
        </p>
        <Button size="lg" asChild>
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
