
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/admin";
import AuthPage from "./pages/auth";
import ValuesPage from "./pages/Values";
import EducationPage from "./pages/Educacao";
import MapPage from "./pages/MapPage";
import { AuthProvider } from "./hooks/use-auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/valores" element={<ValuesPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/educacao" element={<EducationPage />} />
                <Route path="/mapa" element={<MapPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
