
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { materialColors } from '@/types/collection-point';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step3MaterialsProps {
  availableMaterials: string[];
}

const Step3Materials: React.FC<Step3MaterialsProps> = ({ availableMaterials }) => {
  const { control, watch } = useFormContext();
  const selectedMaterials = watch('materials', []);

  return (
    <div className="space-y-4 animate-fade-in">
      <FormField
        control={control}
        name="materials"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Materiais Aceitos</FormLabel>
            <FormMessage className="pb-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableMaterials.map((material) => {
                const isSelected = selectedMaterials.includes(material);
                const colorClass = materialColors[material as keyof typeof materialColors] || 'bg-muted/50';

                return (
                  <label
                    key={material}
                    htmlFor={material}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 aspect-square",
                      isSelected ? 'border-primary ring-2 ring-primary/50 shadow-lg' : 'border-border hover:border-primary/50',
                      !isSelected && colorClass,
                      isSelected && 'bg-primary/20'
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        id={material}
                        className="sr-only"
                        checked={field.value?.includes(material)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, material]
                            : field.value?.filter((value: string) => value !== material);
                          field.onChange(updatedValue);
                        }}
                      />
                    </FormControl>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                        <Check size={14} />
                      </div>
                    )}
                    <span className="font-semibold text-center">{material}</span>
                  </label>
                );
              })}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step3Materials;

