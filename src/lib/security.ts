
import { z } from 'zod';

// Phone number validation schema
export const phoneSchema = z.string()
  .optional()
  .refine((val) => {
    if (!val) return true; // Optional field
    // Brazilian phone number format validation
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(val);
  }, {
    message: "Formato de telefone inválido. Use: (XX) XXXXX-XXXX"
  });

// Address validation schema
export const addressSchema = z.string()
  .min(10, "Endereço deve ter pelo menos 10 caracteres")
  .max(200, "Endereço deve ter no máximo 200 caracteres")
  .refine((val) => {
    // Basic address validation - should contain letters and numbers
    const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s,.-]+$/;
    return addressRegex.test(val);
  }, {
    message: "Endereço contém caracteres inválidos"
  });

// Description content sanitization
export const descriptionSchema = z.string()
  .optional()
  .refine((val) => {
    if (!val) return true;
    // Remove potential XSS patterns
    const xssPatterns = /<script|javascript:|on\w+=/i;
    return !xssPatterns.test(val);
  }, {
    message: "Descrição contém conteúdo não permitido"
  })
  .transform((val) => {
    if (!val) return val;
    // Basic HTML entity encoding for safety
    return val.replace(/[<>&"']/g, (match) => {
      const htmlEntities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return htmlEntities[match] || match;
    });
  });

// Email validation with additional security checks
export const emailSchema = z.string()
  .email("Email inválido")
  .min(5, "Email deve ter pelo menos 5 caracteres")
  .max(254, "Email muito longo")
  .refine((email) => {
    // Additional email security checks
    const suspiciousPatterns = /[<>{}[\]\\]/;
    return !suspiciousPatterns.test(email);
  }, {
    message: "Email contém caracteres não permitidos"
  });

// Password strength validation
export const passwordSchema = z.string()
  .min(8, "Senha deve ter pelo menos 8 caracteres")
  .max(128, "Senha muito longa")
  .refine((password) => {
    // Check for at least one uppercase letter
    return /[A-Z]/.test(password);
  }, {
    message: "Senha deve conter pelo menos uma letra maiúscula"
  })
  .refine((password) => {
    // Check for at least one lowercase letter
    return /[a-z]/.test(password);
  }, {
    message: "Senha deve conter pelo menos uma letra minúscula"
  })
  .refine((password) => {
    // Check for at least one number
    return /\d/.test(password);
  }, {
    message: "Senha deve conter pelo menos um número"
  });

// Rate limiting utility (client-side)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

export const checkRateLimit = (key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitStore.set(key, { count: 1, lastReset: now });
    return true;
  }
  
  if (entry.count >= maxAttempts) {
    return false;
  }
  
  entry.count++;
  return true;
};

// Security headers utility for CSP (Content Security Policy)
export const getSecurityHeaders = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://jnybnmtudvafyyocpsnu.supabase.co wss://jnybnmtudvafyyocpsnu.supabase.co https://api.mapbox.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  };
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

// Validate collection point materials
export const materialsSchema = z.array(z.string())
  .min(1, "Selecione pelo menos um material")
  .max(10, "Máximo de 10 materiais permitidos")
  .refine((materials) => {
    const allowedMaterials = [
      "Papel", "Plástico", "Metal", "Vidro", "Madeira", 
      "Baterias", "Lâmpadas", "Eletrônicos", "Óleo", "Orgânico"
    ];
    return materials.every(material => allowedMaterials.includes(material));
  }, {
    message: "Material não permitido selecionado"
  });
