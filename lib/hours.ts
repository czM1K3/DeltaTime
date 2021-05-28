type Hour = {
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
};

export const HourList: Hour[] = [
    {
        startHour: 8,
        startMinute: 0,
        endHour: 8,
        endMinute: 45
    },
    {
        startHour: 8,
        startMinute: 50,
        endHour: 9,
        endMinute: 35
    },
    {
        startHour: 9,
        startMinute: 50,
        endHour: 10,
        endMinute: 35
    },
    {
        startHour: 10,
        startMinute: 40,
        endHour: 11,
        endMinute: 25
    },
    {
        startHour: 11,
        startMinute: 35,
        endHour: 12,
        endMinute: 20
    },
    {
        startHour: 12,
        startMinute: 25,
        endHour: 13,
        endMinute: 10
    },
    {
        startHour: 13,
        startMinute: 15,
        endHour: 14,
        endMinute: 0
    },
    {
        startHour: 14,
        startMinute: 0,
        endHour: 14,
        endMinute: 45
    },
    {
        startHour: 14,
        startMinute: 45,
        endHour: 15,
        endMinute: 30
    },
    {
        startHour: 15,
        startMinute: 35,
        endHour: 16,
        endMinute: 20
    },
];

export const ConvertToMinutes = (hours: number, minutes: number) => hours * 60 + minutes;
