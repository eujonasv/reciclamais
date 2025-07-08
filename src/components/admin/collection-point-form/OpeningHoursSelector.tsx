import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface DaySchedule {
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

const daysOfWeek = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

const timeOptions = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const OpeningHoursSelector = () => {
  const { control, watch, setValue } = useFormContext();
  const openingHours = watch('openingHours');

  const handleDayToggle = (dayKey: string, enabled: boolean) => {
    setValue(`openingHours.${dayKey}.enabled`, enabled);
    if (!enabled) {
      setValue(`openingHours.${dayKey}.openTime`, '');
      setValue(`openingHours.${dayKey}.closeTime`, '');
    }
  };

  const handleTimeChange = (dayKey: string, timeType: 'openTime' | 'closeTime', value: string) => {
    setValue(`openingHours.${dayKey}.${timeType}`, value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <FormLabel className="text-base font-medium">Horários de Atendimento</FormLabel>
      </div>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          {daysOfWeek.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${key}-enabled`}
                  checked={openingHours?.[key]?.enabled || false}
                  onCheckedChange={(checked) => handleDayToggle(key, !!checked)}
                />
                <label
                  htmlFor={`${key}-enabled`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
              
              {openingHours?.[key]?.enabled && (
                <div className="flex items-center gap-2 ml-6">
                  <Select
                    value={openingHours[key]?.openTime || ''}
                    onValueChange={(value) => handleTimeChange(key, 'openTime', value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Abre" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <span className="text-sm text-muted-foreground">às</span>
                  
                  <Select
                    value={openingHours[key]?.closeTime || ''}
                    onValueChange={(value) => handleTimeChange(key, 'closeTime', value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      
      <p className="text-xs text-muted-foreground">
        Selecione os dias da semana e os horários de funcionamento do ponto de coleta
      </p>
    </div>
  );
};

export default OpeningHoursSelector;