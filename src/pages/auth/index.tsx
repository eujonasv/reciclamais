
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import RecycleLogoWithText from '@/components/RecycleLogoWithText';
import { useAuth } from '@/hooks/use-auth';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

const AuthPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to admin if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/admin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo(a) de volta!",
        });
        navigate('/admin');
      }
    } catch (error: any) {
      let errorMessage = error.message;
      
      if (error.message.includes("Invalid login")) {
        errorMessage = "Email ou senha inválidos";
      }
      
      toast({
        title: "Erro ao fazer login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-8 sm:py-12 px-4">
        <div className="mx-auto grid w-full max-w-[380px] gap-6">
          <div className="grid gap-4 text-center">
            <Link to="/" className="flex justify-center mb-4">
              <RecycleLogoWithText size="lg" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">Acesso Administrativo</h1>
            <p className="text-balance text-muted-foreground text-sm sm:text-base px-2">
              Faça login para gerenciar a plataforma RECICLA+
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 sm:h-10 text-base sm:text-sm"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Senha</Label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 sm:h-10 text-base sm:text-sm"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 sm:h-10 text-base sm:text-sm touch-manipulation" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            <Link to="/" className="inline-flex items-center gap-2 underline text-muted-foreground hover:text-primary transition-colors touch-manipulation py-2">
              <ArrowLeft size={16} /> Voltar para o site
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843"
          alt="Imagem de uma floresta com a luz do sol brilhando por entre as árvores"
          className="h-screen w-full object-cover dark:brightness-[0.3]"
        />
      </div>
    </div>
  );
};

export default AuthPage;
