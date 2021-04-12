const getDeltaTime = (): string => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let days = time.getDay();
    let month = time.getUTCMonth();

    if (month === 6 || month === 7) {
        return "Jsou prázdniny.";
    } else if (days === 6 || days === 0) {
        return "Je víkend!";
    } else if (hours < 8) {
        let EndHour = 7 - hours;
        let EndMinutes = 59 - minutes;
        let EndSeconds = 59 - seconds;
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
    } else if (hours === 8 && minutes >= 0 && minutes < 45) {
        let EndMinutes = 44 - minutes;
        let EndSeconds = 59 - seconds;
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 8 && minutes >= 45 && minutes < 50) {
        let EndMinutes = 49 - minutes;
        let EndSeconds = 59 - seconds;
        return (
            "Přestávka končí za: " +
            EndMinutes +
            ":" +
            CalcSec(EndSeconds) +
            EndSeconds
        );
    } else if (
        (hours === 8 && minutes >= 50) ||
        (hours === 9 && minutes < 35)
    ) {
        let EndHour = 9 - hours;
        let EndMinutes = 34 - minutes;
        let EndSeconds = 59 - seconds;
        if (EndHour === 1) {
            EndMinutes += 60;
        }
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 9 && minutes < 50) {
        let EndMinutes = 49 - minutes;
        let EndSeconds = 59 - seconds;
        return (
            "Přestávka končí za: " +
            EndMinutes +
            ":" +
            CalcSec(EndSeconds) +
            EndSeconds
        );
    } else if (hours === 9 || (hours === 10 && minutes < 35)) {
        let EndHour = 10 - hours;
        let EndMinutes = 34 - minutes;
        let EndSeconds = 59 - seconds;
        if (EndHour === 1) {
            EndMinutes += 60;
        }
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 10 && minutes < 40) {
        let EndMinutes = 39 - minutes;
        let EndSeconds = 59 - seconds;
        return (
            "Přestávka končí za: " +
            EndMinutes +
            ":" +
            CalcSec(EndSeconds) +
            EndSeconds
        );
    } else if (hours === 10 || (hours === 11 && minutes < 25)) {
        let EndHour = 11 - hours;
        let EndMinutes = 24 - minutes;
        let EndSeconds = 59 - seconds;
        if (EndHour === 1) {
            EndMinutes += 60;
        }
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 11 && minutes < 35) {
        let EndMinutes = 34 - minutes;
        let EndSeconds = 59 - seconds;
        return (
            "Přestávka končí za: " +
            EndMinutes +
            ":" +
            CalcSec(EndSeconds) +
            EndSeconds
        );
    } else if (hours === 11 || (hours === 12 && minutes < 20)) {
        let EndHour = 12 - hours;
        let EndMinutes = 19 - minutes;
        let EndSeconds = 59 - seconds;
        if (EndHour === 1) {
            EndMinutes += 60;
        }
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 12 && minutes < 25) {
        let EndMinutes = 24 - minutes;
        let EndSeconds = 59 - seconds;
        return (
            "Přestávka končí za: " +
            EndMinutes +
            ":" +
            CalcSec(EndSeconds) +
            EndSeconds
        );
    } else if (hours === 12 || (hours === 13 && minutes < 10)) {
        let EndHour = 13 - hours;
        let EndMinutes = 9 - minutes;
        let EndSeconds = 59 - seconds;
        if (EndHour === 1) {
            EndMinutes += 60;
        }
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 13 && minutes < 15) {
        let EndMinutes = 14 - minutes;
        let EndSeconds = 59 - seconds;
        return (
            "Přestávka končí za: " +
            EndMinutes +
            ":" +
            CalcSec(EndSeconds) +
            EndSeconds
        );
    } else if (hours === 13) {
        let EndMinutes = 59 - minutes;
        let EndSeconds = 59 - seconds;
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 14 && minutes < 45) {
        let EndMinutes = 44 - minutes;
        let EndSeconds = 59 - seconds;
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else if (hours === 14 || (hours === 15 && minutes < 30)) {
        let EndHour = 15 - hours;
        let EndMinutes = 29 - minutes;
        let EndSeconds = 59 - seconds;
        if (EndHour === 1) {
            EndMinutes += 60;
        }
        return EndMinutes + ":" + CalcSec(EndSeconds) + EndSeconds;
    } else {
        return "Škola už dnes skončila.";
    }
};
export default getDeltaTime;

const CalcSec = (sekunda: number): string => {
    if (sekunda < 10) {
        return "0";
    } else {
        return "";
    }
};
