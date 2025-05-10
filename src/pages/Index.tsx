
import React from "react";
import Layout from "@/components/Layout";
import Calendar from "@/components/Calendar";
import RulesFooter from "@/components/RulesFooter";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";

// Main content component that requires authentication
const MainContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <Calendar />
      <RulesFooter />
    </div>
  );
};

// Index page with auth provider
const Index: React.FC = () => {
  return (
    <AuthProvider>
      <Layout>
        <MainContent />
      </Layout>
    </AuthProvider>
  );
};

export default Index;
