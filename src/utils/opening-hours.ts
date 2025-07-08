export interface DaySchedule {
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

const daysInPortuguese = {
  monday: 'Seg',
  tuesday: 'Ter',
  wednesday: 'Qua',
  thursday: 'Qui',
  friday: 'Sex',
  saturday: 'Sáb',
  sunday: 'Dom'
};

export const formatOpeningHours = (openingHours: OpeningHours): string => {
  const enabledDays = Object.entries(openingHours)
    .filter(([_, schedule]) => schedule.enabled && schedule.openTime && schedule.closeTime)
    .map(([day, schedule]) => 
      `${daysInPortuguese[day as keyof typeof daysInPortuguese]}: ${schedule.openTime}-${schedule.closeTime}`
    );
  
  if (enabledDays.length === 0) {
    return 'Horário não informado';
  }
  
  return enabledDays.join(', ');
};