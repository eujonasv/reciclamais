
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { phoneSchema } from '@/lib/security';
import OpeningHoursSelector from './OpeningHoursSelector';

const Step1BasicInfo = () => {
  const { control, watch, setError, clearErrors } = useFormContext();
  const [phoneError, setPhoneError] = useState('');
  
  const phoneValue = watch('phone');

  // Real-time phone validation
  useEffect(() => {
    if (phoneValue) {
      const result = phoneSchema.safeParse(phoneValue);
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || 'Formato de telefone inválido';
        setPhoneError(errorMessage);
        setError('phone', { message: errorMessage });
      } else {
        setPhoneError('');
        clearErrors('phone');
      }
    } else {
      setPhoneError('');
      clearErrors('phone');
    }
  }, [phoneValue, setError, clearErrors]);

  return (
    <div className="space-y-4 animate-fade-in">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Ponto de Coleta</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Ponto de Reciclagem Central" 
                {...field}
                maxLength={100}
                onChange={(e) => {
                  // Basic input sanitization
                  const sanitized = e.target.value.replace(/[<>]/g, '');
                  field.onChange(sanitized);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <OpeningHoursSelector />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone (opcional)</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="(00) 00000-0000" 
                {...field}
                maxLength={15}
                onChange={(e) => {
                  // Auto-format phone number
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                  } else if (value.length >= 7) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                  } else if (value.length >= 3) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                  }
                  field.onChange(value);
                }}
                className={phoneError ? 'border-red-500' : ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website (opcional)</FormLabel>
            <FormControl>
              <Input 
                type="url" 
                placeholder="https://exemplo.com" 
                {...field}
                maxLength={200}
                onChange={(e) => {
                  // Basic URL validation and sanitization
                  let value = e.target.value.trim();
                  if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
                    value = 'https://' + value;
                  }
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step1BasicInfo;
