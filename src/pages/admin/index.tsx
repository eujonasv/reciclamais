
import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import AdminMap from '@/components/AdminMap';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, MapPin, Layers, Package, ListTree } from 'lucide-react';
import { useCollectionPoints } from '@/hooks/use-collection-points';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPage = () => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const collectionPointsData = useCollectionPoints();
  const { points } = collectionPointsData;

  const validPoints = points || [];

  // Stat: Total de Materiais Únicos
  const uniqueMaterials = new Set(validPoints.flatMap(p => Array.isArray(p.materials) ? p.materials.map(m => m.trim()) : []));
  const uniqueMaterialsCount = uniqueMaterials.size;

  // Stat: Material Mais Comum
  const allMaterials = validPoints.flatMap(p => Array.isArray(p.materials) ? p.materials.map(m => m.trim()) : []);
  let mostCommonMaterial = "N/A";
  if (allMaterials.length > 0) {
      const materialCounts = allMaterials.reduce((acc, material) => {
        acc[material] = (acc[material] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      mostCommonMaterial = Object.entries(materialCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  }

  // Stat: Média de Materiais por Ponto
  const totalMaterialsCount = validPoints.reduce((sum, p) => sum + (Array.isArray(p.materials) ? p.materials.length : 0), 0);
  const averageMaterials = validPoints.length > 0 ? (totalMaterialsCount / validPoints.length).toFixed(1) : "0.0";

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
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pontos de Coleta Totais
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{validPoints.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total de pontos de coleta cadastrados
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Materiais Únicos
                </CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueMaterialsCount}</div>
                <p className="text-xs text-muted-foreground">
                  Tipos de materiais diferentes
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Material Mais Comum
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{mostCommonMaterial}</div>
                <p className="text-xs text-muted-foreground">
                  Material mais frequente nos pontos
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média de Materiais
                </CardTitle>
                <ListTree className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageMaterials}</div>
                <p className="text-xs text-muted-foreground">
                  Média de materiais por ponto
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
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
