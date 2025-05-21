
import React, { useState } from 'react';
import MainLayout from "@/layouts/MainLayout";
import AdminMap from '@/components/AdminMap';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/use-auth';
import { LogOut } from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<string>("map");
  const isMobile = useIsMobile();
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <Button variant="outline" onClick={logout} className="ml-auto">
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>

          <div className="w-full">
            <AdminMap isMobile={isMobile} />
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default AdminPage;
