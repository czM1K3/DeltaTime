export const getDeltaTime = (): number => {
    let time = getTime();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let days = time.getDay();
    let month = time.getUTCMonth();

    if (month === 6 || month === 7) {
        return 11;
    } else if (days === 6 || days === 0) {
        return 12;
    } else if (hours < 8) {
        return -1;
    } else if (hours === 8 && minutes >= 0 && minutes < 45) {
        return 1;
    } else if (hours === 8 && minutes >= 45 && minutes < 50) {
        return -2;
    } else if (
        (hours === 8 && minutes >= 50) ||
        (hours === 9 && minutes < 35)
    ) {
        return 2;
    } else if (hours === 9 && minutes < 50) {
        return -3;
    } else if (hours === 9 || (hours === 10 && minutes < 35)) {
        return 3;
    } else if (hours === 10 && minutes < 40) {
        return -4;
    } else if (hours === 10 || (hours === 11 && minutes < 25)) {
        return 4;
    } else if (hours === 11 && minutes < 35) {
        return -5;
    } else if (hours === 11 || (hours === 12 && minutes < 20)) {
        return 5;
    } else if (hours === 12 && minutes < 25) {
        return -6;
    } else if (hours === 12 || (hours === 13 && minutes < 10)) {
        return 6;
    } else if (hours === 13 && minutes < 15) {
        return -7;
    } else if (hours === 13) {
        return 7;
    } else if (hours === 14 && minutes < 45) {
        return 8;
    } else if (hours === 14 || (hours === 15 && minutes < 30)) {
        return 9;
    } else {
        return 0;
    }
};

export const getString = (current) => {
    let time = getTime();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
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

const getTime = (): Date => {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" })
    );
};
