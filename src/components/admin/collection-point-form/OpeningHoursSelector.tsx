import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Copy, RotateCcw } from 'lucide-react';

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
  { key: 'monday', label: 'Seg', fullLabel: 'Segunda-feira' },
  { key: 'tuesday', label: 'Ter', fullLabel: 'Terça-feira' },
  { key: 'wednesday', label: 'Qua', fullLabel: 'Quarta-feira' },
  { key: 'thursday', label: 'Qui', fullLabel: 'Quinta-feira' },
  { key: 'friday', label: 'Sex', fullLabel: 'Sexta-feira' },
  { key: 'saturday', label: 'Sáb', fullLabel: 'Sábado' },
  { key: 'sunday', label: 'Dom', fullLabel: 'Domingo' },
];

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

const OpeningHoursSelector = () => {
  const { control, watch, setValue } = useFormContext();
  const openingHours = watch('openingHours');
  const [templateTimes, setTemplateTimes] = useState({ openTime: '08:00', closeTime: '17:00' });

  const handleDayToggle = (dayKey: string, enabled: boolean) => {
    setValue(`openingHours.${dayKey}.enabled`, enabled);
    if (!enabled) {
      setValue(`openingHours.${dayKey}.openTime`, '');
      setValue(`openingHours.${dayKey}.closeTime`, '');
    } else {
      setValue(`openingHours.${dayKey}.openTime`, templateTimes.openTime);
      setValue(`openingHours.${dayKey}.closeTime`, templateTimes.closeTime);
    }
  };

  const handleTimeChange = (dayKey: string, timeType: 'openTime' | 'closeTime', value: string) => {
    setValue(`openingHours.${dayKey}.${timeType}`, value);
  };

  const applyToAll = () => {
    daysOfWeek.forEach(({ key }) => {
      setValue(`openingHours.${key}.enabled`, true);
      setValue(`openingHours.${key}.openTime`, templateTimes.openTime);
      setValue(`openingHours.${key}.closeTime`, templateTimes.closeTime);
    });
  };

  const clearAll = () => {
    daysOfWeek.forEach(({ key }) => {
      setValue(`openingHours.${key}.enabled`, false);
      setValue(`openingHours.${key}.openTime`, '');
      setValue(`openingHours.${key}.closeTime`, '');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <FormLabel className="text-base font-medium">Horários de Atendimento</FormLabel>
      </div>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Template de horários */}
          <div className="bg-muted/50 p-3 rounded-lg space-y-3">
            <div className="text-sm font-medium text-muted-foreground">Horário padrão</div>
            <div className="flex items-center gap-2">
              <Select
                value={templateTimes.openTime}
                onValueChange={(value) => setTemplateTimes(prev => ({ ...prev, openTime: value }))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
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
                value={templateTimes.closeTime}
                onValueChange={(value) => setTemplateTimes(prev => ({ ...prev, closeTime: value }))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={applyToAll}
                className="ml-2"
              >
                <Copy className="h-4 w-4 mr-1" />
                Aplicar a todos
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={clearAll}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Limpar todos
              </Button>
            </div>
          </div>

          {/* Dias da semana em grid compacto */}
          <div className="grid grid-cols-1 gap-2">
            {daysOfWeek.map(({ key, label, fullLabel }) => (
              <div key={key} className="flex items-center gap-3 p-2 border rounded-lg">
                <div className="flex items-center space-x-2 min-w-0">
                  <Checkbox
                    id={`${key}-enabled`}
                    checked={openingHours?.[key]?.enabled || false}
                    onCheckedChange={(checked) => handleDayToggle(key, !!checked)}
                  />
                  <label
                    htmlFor={`${key}-enabled`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 min-w-[60px]"
                  >
                    {label}
                  </label>
                </div>
                
                {openingHours?.[key]?.enabled && (
                  <div className="flex items-center gap-2 flex-1">
                    <Select
                      value={openingHours[key]?.openTime || ''}
                      onValueChange={(value) => handleTimeChange(key, 'openTime', value)}
                    >
                      <SelectTrigger className="w-20">
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
                    
                    <span className="text-xs text-muted-foreground">às</span>
                    
                    <Select
                      value={openingHours[key]?.closeTime || ''}
                      onValueChange={(value) => handleTimeChange(key, 'closeTime', value)}
                    >
                      <SelectTrigger className="w-20">
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
          </div>
        </CardContent>
      </Card>
      
      <p className="text-xs text-muted-foreground">
        Use o horário padrão para aplicar o mesmo horário a todos os dias. Depois, ajuste individualmente conforme necessário.
      </p>
    </div>
  );
};

export default OpeningHoursSelector;