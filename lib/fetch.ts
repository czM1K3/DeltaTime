import { JSDOM } from "jsdom";


export const getData = async (classId, day, lesson) => {
    return await fetch("https://delta-skola.bakalari.cz/Timetable/Public/Permanent/Class/" + classId).then(x => x.text()).then(text => {
        const dom = new JSDOM(text);
        const array = [];
        dom.window.document.querySelectorAll("#main > div:nth-child(" + (day + 2) + ") > div.bk-cell-wrapper > div:nth-child(" + (lesson + 1) + ") > div > div > div > div.middle").forEach(x=>array.push(x.innerHTML));
        return array;
    }).catch(() => {
        return null;
    });
}