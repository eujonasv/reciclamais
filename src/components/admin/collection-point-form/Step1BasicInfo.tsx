
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Step1BasicInfo = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4 animate-fade-in">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Ponto de Coleta</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Ponto de Reciclagem Central" {...field} />
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
              <Textarea placeholder="Descreva o local e os materiais aceitos..." {...field} />
            </FormControl>
            <FormMessage />
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
              <Input type="tel" placeholder="(00) 00000-0000" {...field} />
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
              <Input type="url" placeholder="https://exemplo.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step1BasicInfo;

