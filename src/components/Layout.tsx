
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./Header";
import LoginModal from "./LoginModal";
import Assistant from "./Assistant";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 px-4 md:py-8">
        {children}
      </main>
      
      {isAuthenticated ? <Assistant /> : <LoginModal />}
    </div>
  );
};

export default Layout;
