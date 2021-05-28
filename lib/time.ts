import { HourList, ConvertToMinutes, GetRemainingTime } from "./hours";

export const getDeltaTime = (): number => {
    const time = getTime();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const days = time.getDay();
    const month = time.getUTCMonth();
    const dayMinutes = hours * 60 + minutes;

    if (month === 6 || month === 7) return 11;
    else if (days === 6 || days === 0) return 12;
    
    const returnable = HourList.map((x, index) => {
        const realIndex = index + 1;
        if (dayMinutes < ConvertToMinutes(x.startHour, x.startMinute)) return -1 * realIndex;
        if (dayMinutes < ConvertToMinutes(x.endHour, x.endMinute)) return realIndex;
    });
    
    return returnable.filter(Number)[0] ?? 0;
};

export const getString = (current) => {
    const time = getTime();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const daySeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
    switch (current) {
        case 0:
            return "Škola už dnes skončila.";
        case 11:
            return "Jsou prázdniny.";
        case 12:
            return "Je víkend!";             
    }
    const remaingingTime = GetRemainingTime(current, daySeconds);
    if (current === -1) return `Škola začíná za:\n${remaingingTime.Hours}:${remaingingTime.Minutes}:${CalcSec(remaingingTime.Seconds)}`
    return current < 1 ? `Přestávka končí za: ${remaingingTime.Minutes}:${CalcSec(remaingingTime.Seconds)}`:`${remaingingTime.Minutes}:${CalcSec(remaingingTime.Seconds)}`;
};

const CalcSec = (sekunda: number): string => {
    if (sekunda < 10) {
        return "0" + sekunda;
    } else {
        return sekunda.toString();
    }
};

export const GetDay = () => {
    let time = getTime();
    return time.getDay();
}

const getTime = (): Date => {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" })
    );
};
