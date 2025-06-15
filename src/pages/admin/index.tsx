
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
import MaterialStatsChart from '@/components/admin/MaterialStatsChart';

const AdminPage = () => {
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  const collectionPointsData = useCollectionPoints();
  const { points } = collectionPointsData;

  const validPoints = points || [];

  const uniqueMaterials = new Set(validPoints.flatMap(p => Array.isArray(p.materials) ? p.materials.map(m => m.trim()) : []));
  const uniqueMaterialsCount = uniqueMaterials.size;

  const allMaterials = validPoints.flatMap(p => Array.isArray(p.materials) ? p.materials.map(m => m.trim()) : []);
  const materialCounts = allMaterials.reduce((acc, material) => {
    acc[material] = (acc[material] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  let mostCommonMaterial = "N/A";
  if (allMaterials.length > 0) {
      mostCommonMaterial = Object.entries(materialCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  }

  const chartData = Object.entries(materialCounts)
    .map(([name, count]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), count }))
    .sort((a, b) => b.count - a.count);

  const totalMaterialsCount = validPoints.reduce((sum, p) => sum + (Array.isArray(p.materials) ? p.materials.length : 0), 0);
  const averageMaterials = validPoints.length > 0 ? (totalMaterialsCount / validPoints.length).toFixed(1) : "0.0";

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Painel do Administrador</h1>
              <p className="text-muted-foreground mt-1">Bem-vindo! Aqui estão as métricas e ferramentas.</p>
            </div>
            <Button variant="outline" onClick={logout} className="self-start sm:self-center">
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="animate-fade-in card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pontos de Coleta
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

            <Card className="animate-fade-in card-hover" style={{ animationDelay: '100ms' }}>
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

            <Card className="animate-fade-in card-hover" style={{ animationDelay: '200ms' }}>
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
            
            <Card className="animate-fade-in card-hover" style={{ animationDelay: '300ms' }}>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <MaterialStatsChart data={chartData} />
            </div>
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
                <AdminMap isMobile={isMobile} collectionPointsData={collectionPointsData} />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default AdminPage;
