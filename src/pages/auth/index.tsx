
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import RecycleLogoWithText from '@/components/RecycleLogoWithText';
import { useAuth } from '@/hooks/use-auth';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { emailSchema, passwordSchema } from '@/lib/security';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const AuthPage = () => {
  const [email, setEmail] = useState(() => {
    // Lembrar último email usado
    return localStorage.getItem('recicla_last_email') || '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  
  const { attempt: attemptLogin, isBlocked } = useRateLimit('login', {
    maxAttempts: 5,
    windowMs: 300000, // 5 minutes
    errorMessage: "Muitas tentativas de login. Tente novamente em 5 minutos."
  });

  // Redirect to admin if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/admin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Real-time email validation
  useEffect(() => {
    if (email) {
      const result = emailSchema.safeParse(email);
      setEmailError(result.success ? '' : result.error.errors[0]?.message || '');
    } else {
      setEmailError('');
    }
  }, [email]);

  // Real-time password validation
  useEffect(() => {
    if (password) {
      const result = passwordSchema.safeParse(password);
      setPasswordError(result.success ? '' : result.error.errors[0]?.message || '');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      return;
    }

    if (!attemptLogin()) {
      return;
    }

    // Validate inputs
    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    if (!emailValidation.success) {
      setEmailError(emailValidation.error.errors[0]?.message || 'Email inválido');
      return;
    }

    if (!passwordValidation.success) {
      setPasswordError(passwordValidation.error.errors[0]?.message || 'Senha inválida');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailValidation.data,
        password: passwordValidation.data,
      });

      if (error) throw error;

      if (data.session) {
        // Salvar último email usado com sucesso
        localStorage.setItem('recicla_last_email', emailValidation.data);
        
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
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Email não confirmado. Verifique sua caixa de entrada.";
      } else if (error.message.includes("Too many requests")) {
        errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
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

  const isFormValid = !emailError && !passwordError && email && password;

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="flex items-center justify-center py-8 sm:py-12 px-4 animate-fade-in">
        <div className="mx-auto grid w-full max-w-[380px] gap-6">
          <div className="grid gap-4 text-center">
            <Link to="/" className="flex justify-center mb-4 group">
              <div className="transition-transform group-hover:scale-105">
                <RecycleLogoWithText size="lg" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-recicla-primary to-recicla-secondary bg-clip-text text-transparent">
              Acesso Administrativo
            </h1>
            <p className="text-balance text-muted-foreground text-sm sm:text-base px-2">
              Faça login para gerenciar a plataforma RECICLA+
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-recicla-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 h-11 sm:h-10 text-base sm:text-sm transition-all ${
                    emailError ? 'border-red-500 focus:border-red-500' : 'focus:border-recicla-primary'
                  }`}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
              </div>
              {emailError && (
                <p id="email-error" className="text-sm text-red-500 animate-fade-in" role="alert">
                  {emailError}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Senha</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-recicla-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 h-11 sm:h-10 text-base sm:text-sm transition-all ${
                    passwordError ? 'border-red-500 focus:border-red-500' : 'focus:border-recicla-primary'
                  }`}
                  aria-describedby={passwordError ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-recicla-primary transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="text-sm text-red-500 animate-fade-in" role="alert">
                  {passwordError}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 sm:h-10 text-base sm:text-sm touch-manipulation bg-gradient-to-r from-recicla-primary to-recicla-secondary hover:from-recicla-primary/90 hover:to-recicla-secondary/90 transition-all duration-300 transform hover:scale-[1.02]" 
              disabled={loading || isBlocked || !isFormValid}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : isBlocked ? 'Bloqueado temporariamente' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 underline text-muted-foreground hover:text-recicla-primary transition-colors touch-manipulation py-2 group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
              Voltar para o site
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-gradient-to-br from-recicla-primary/10 to-recicla-secondary/10 lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-recicla-primary/20 to-recicla-secondary/20" />
        <img
          src="https://images.unsplash.com/photo-1518495973542-4542c06a5843"
          alt="Imagem de uma floresta com a luz do sol brilhando por entre as árvores"
          className="h-screen w-full object-cover mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Gerencie com sustentabilidade</h2>
          <p className="text-white/90">Administre os pontos de coleta e contribua para um futuro mais verde.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
