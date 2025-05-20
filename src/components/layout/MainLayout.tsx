
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-blue-900 text-white text-xs py-1 px-6 text-center">
          LAW ENFORCEMENT RESTRICTED - AUTHORIZED PERSONNEL ONLY - CASE EVIDENCE SYSTEM
        </div>
        <div className="bg-blue-800 text-white text-[10px] py-0.5 px-6 text-center">
          DIGITAL FORENSICS DIVISION - DEEPFAKE ANALYSIS UNIT
        </div>
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
