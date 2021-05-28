import { HourList, ConvertToMinutes } from "./hours";

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
    let EndHour;
    let EndMinutes;
    let EndSeconds;
    switch (current) {
        case 0:
            return "Škola už dnes skončila.";
        case 11:
            return "Jsou prázdniny.";
        case 12:
            return "Je víkend!";
        case -1:
            EndHour = 7 - hours;
            EndMinutes = 59 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Do začátku školy:\n" +
                EndHour +
                ":" +
                CalcSec(EndMinutes) +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 1:
            EndMinutes = 44 - minutes;
            EndSeconds = 59 - seconds;
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case -2:
            EndMinutes = 49 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Přestávka končí za: " +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 2:
            EndHour = 9 - hours;
            EndMinutes = 34 - minutes;
            EndSeconds = 59 - seconds;
            if (EndHour === 1) {
                EndMinutes += 60;
            }
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case -3:
            EndMinutes = 49 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Přestávka končí za: " +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 3:
            EndHour = 10 - hours;
            EndMinutes = 34 - minutes;
            EndSeconds = 59 - seconds;
            if (EndHour === 1) {
                EndMinutes += 60;
            }
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case -4:
            EndMinutes = 39 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Přestávka končí za: " +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 4:
            EndHour = 11 - hours;
            EndMinutes = 24 - minutes;
            EndSeconds = 59 - seconds;
            if (EndHour === 1) {
                EndMinutes += 60;
            }
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case -5:
            EndMinutes = 34 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Přestávka končí za: " +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 5:
            EndHour = 12 - hours;
            EndMinutes = 19 - minutes;
            EndSeconds = 59 - seconds;
            if (EndHour === 1) {
                EndMinutes += 60;
            }
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case -6:
            EndMinutes = 24 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Přestávka končí za: " +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 6:
            EndHour = 13 - hours;
            EndMinutes = 9 - minutes;
            EndSeconds = 59 - seconds;
            if (EndHour === 1) {
                EndMinutes += 60;
            }
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case -7:
            EndMinutes = 14 - minutes;
            EndSeconds = 59 - seconds;
            return (
                "Přestávka končí za: " +
                EndMinutes +
                ":" +
                CalcSec(EndSeconds) +
                EndSeconds
            );
        case 7:
            EndMinutes = 59 - minutes;
            EndSeconds = 59 - seconds;
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case 8:
            EndMinutes = 44 - minutes;
            EndSeconds = 59 - seconds;
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
        case 9:
            EndHour = 15 - hours;
            EndMinutes = 29 - minutes;
            EndSeconds = 59 - seconds;
            if (EndHour === 1) {
                EndMinutes += 60;
            }
            return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;

        default:
            return "Chyba";
    }
};

const CalcSec = (sekunda: number): string => {
    if (sekunda < 10) {
        return "0";
    } else {
        return "";
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
