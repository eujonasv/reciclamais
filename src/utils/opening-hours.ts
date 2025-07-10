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
  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  const enabledDays = daysOrder
    .map(day => ({ day, schedule: openingHours[day as keyof OpeningHours] }))
    .filter(({ schedule }) => schedule.enabled && schedule.openTime && schedule.closeTime);
  
  if (enabledDays.length === 0) {
    return 'Horário não informado';
  }
  
  // Agrupar dias consecutivos com horários iguais
  const groups: Array<{ days: string[], time: string }> = [];
  let currentGroup: { days: string[], time: string } | null = null;
  
  enabledDays.forEach(({ day, schedule }) => {
    const timeString = `${schedule.openTime}-${schedule.closeTime}`;
    const dayName = daysInPortuguese[day as keyof typeof daysInPortuguese];
    
    if (!currentGroup || currentGroup.time !== timeString) {
      // Novo grupo
      currentGroup = { days: [dayName], time: timeString };
      groups.push(currentGroup);
    } else {
      // Adicionar ao grupo atual
      currentGroup.days.push(dayName);
    }
  });
  
  // Formatar grupos para exibição
  return groups.map(group => {
    if (group.days.length === 1) {
      return `${group.days[0]}: ${group.time}`;
    } else if (group.days.length === 2) {
      return `${group.days[0]} e ${group.days[1]}: ${group.time}`;
    } else {
      return `${group.days[0]} a ${group.days[group.days.length - 1]}: ${group.time}`;
    }
  }).join(', ');
};