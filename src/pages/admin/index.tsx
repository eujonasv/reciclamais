
import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import AdminMap from '@/components/AdminMap';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, MapPin } from 'lucide-react';
import { useCollectionPoints } from '@/hooks/use-collection-points';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPage = () => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const collectionPointsData = useCollectionPoints();
  const { points } = collectionPointsData;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <Button variant="outline" onClick={logout} className="ml-auto">
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pontos de Coleta Totais
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{points.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total de pontos de coleta cadastrados
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4 md:p-6">
              <AdminMap isMobile={isMobile} collectionPointsData={collectionPointsData} />
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default AdminPage;
