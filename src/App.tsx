
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/admin";

import AuthPage from "./pages/auth";
import ValuesPage from "./pages/Values";
import EducationPage from "./pages/Educacao";
import MapPage from "./pages/MapPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import { AuthProvider } from "./hooks/use-auth";
import { OfflineProvider } from "./hooks/use-offline";
import { OfflineIndicator } from "./components/ui/offline-indicator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class">
      <OfflineProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/valores" element={<ValuesPage />} />
              <Route path="/admin" element={<AdminPage />} />
              
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/educacao" element={<EducationPage />} />
              <Route path="/mapa" element={<MapPage />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
              <Route path="/termos-de-servico" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </OfflineProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
