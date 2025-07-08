
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CollectionPoint } from '@/types/collection-point';

import FormStepper from './FormStepper';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Location from './Step2Location';
import Step3Materials from './Step3Materials';
import { DialogClose } from '@/components/ui/dialog';
import { DrawerClose } from '@/components/ui/drawer';

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  openingHours: z.object({
    monday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
    tuesday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
    wednesday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
    thursday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
    friday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
    saturday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
    sunday: z.object({
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
  }),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  phone: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal('')),
  materials: z.array(z.string()).min(1, "Selecione pelo menos um material.")
});

interface MultiStepCollectionPointFormProps {
  isEditing: boolean;
  editingPoint: CollectionPoint | null;
  availableMaterials: string[];
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onCancel: () => void;
  isMobile?: boolean;
}

const steps = ["Básico", "Localização", "Materiais"];

export const MultiStepCollectionPointForm: React.FC<MultiStepCollectionPointFormProps> = ({
  isEditing,
  editingPoint,
  availableMaterials,
  onSubmit,
  onCancel,
  isMobile = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: editingPoint?.name || "",
      openingHours: {
        monday: { enabled: false, openTime: '', closeTime: '' },
        tuesday: { enabled: false, openTime: '', closeTime: '' },
        wednesday: { enabled: false, openTime: '', closeTime: '' },
        thursday: { enabled: false, openTime: '', closeTime: '' },
        friday: { enabled: false, openTime: '', closeTime: '' },
        saturday: { enabled: false, openTime: '', closeTime: '' },
        sunday: { enabled: false, openTime: '', closeTime: '' },
      },
      address: editingPoint?.address || "",
      latitude: editingPoint?.latitude || 0,
      longitude: editingPoint?.longitude || 0,
      phone: editingPoint?.phone || "",
      website: editingPoint?.website || "",
      materials: editingPoint?.materials || []
    },
  });

  const { trigger } = form;

  const handleNext = async () => {
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['name', 'openingHours'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['address', 'latitude', 'longitude'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const CloseButton = isMobile ? DrawerClose : DialogClose;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
        <FormStepper currentStep={currentStep} steps={steps} />

        <div className="flex-grow min-h-[300px] overflow-y-auto pr-2 -mr-2">
          {currentStep === 1 && <Step1BasicInfo />}
          {currentStep === 2 && <Step2Location />}
          {currentStep === 3 && <Step3Materials availableMaterials={availableMaterials} />}
        </div>
        
        <div className="flex justify-between gap-2 pt-4 flex-shrink-0">
          <div>
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <CloseButton asChild>
              <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
            </CloseButton>
            {currentStep < steps.length && (
              <Button type="button" onClick={handleNext}>
                Próximo
              </Button>
            )}
            {currentStep === steps.length && (
              <Button type="submit">
                {isEditing ? "Atualizar" : "Adicionar"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

