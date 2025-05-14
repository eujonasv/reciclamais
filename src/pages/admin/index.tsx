
import React, { useState } from 'react';
import MainLayout from "@/layouts/MainLayout";
import AdminMap from '@/components/AdminMap';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/use-auth';
import SocialLinksManager from '@/components/admin/SocialLinksManager';
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

          <Tabs
            defaultValue="map"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b mb-4">
              <TabsList className="mb-0">
                <TabsTrigger value="map">Pontos de Coleta</TabsTrigger>
                <TabsTrigger value="social">Redes Sociais</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="map" className="mt-0">
              <AdminMap isMobile={isMobile} />
            </TabsContent>
            
            <TabsContent value="social" className="mt-0">
              <div className="max-w-3xl mx-auto">
                <SocialLinksManager />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default AdminPage;
