
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { phoneSchema, descriptionSchema } from '@/lib/security';

const Step1BasicInfo = () => {
  const { control, watch, setError, clearErrors } = useFormContext();
  const [phoneError, setPhoneError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  
  const phoneValue = watch('phone');
  const descriptionValue = watch('description');

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

  // Real-time description validation
  useEffect(() => {
    if (descriptionValue) {
      const result = descriptionSchema.safeParse(descriptionValue);
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || 'Descrição inválida';
        setDescriptionError(errorMessage);
        setError('description', { message: errorMessage });
      } else {
        setDescriptionError('');
        clearErrors('description');
      }
    } else {
      setDescriptionError('');
      clearErrors('description');
    }
  }, [descriptionValue, setError, clearErrors]);

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
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva o local e os materiais aceitos..." 
                {...field}
                maxLength={500}
                rows={4}
                onChange={(e) => {
                  // Apply description schema transformation
                  const result = descriptionSchema.safeParse(e.target.value);
                  if (result.success) {
                    field.onChange(result.data);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                className={descriptionError ? 'border-red-500' : ''}
              />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-muted-foreground">
              {descriptionValue?.length || 0}/500 caracteres
            </p>
          </FormItem>
        )}
      />
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
