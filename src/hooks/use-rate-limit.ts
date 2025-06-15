
import { useState, useCallback } from 'react';
import { checkRateLimit } from '@/lib/security';
import { toast } from '@/hooks/use-toast';

interface UseRateLimitOptions {
  maxAttempts?: number;
  windowMs?: number;
  errorMessage?: string;
}

export const useRateLimit = (key: string, options: UseRateLimitOptions = {}) => {
  const {
    maxAttempts = 5,
    windowMs = 60000,
    errorMessage = "Muitas tentativas. Tente novamente em alguns minutos."
  } = options;

  const [isBlocked, setIsBlocked] = useState(false);

  const attempt = useCallback(() => {
    const allowed = checkRateLimit(key, maxAttempts, windowMs);
    
    if (!allowed) {
      setIsBlocked(true);
      toast({
        title: "Limite excedido",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Reset block after window period
      setTimeout(() => setIsBlocked(false), windowMs);
      return false;
    }
    
    return true;
  }, [key, maxAttempts, windowMs, errorMessage]);

  return { attempt, isBlocked };
};
