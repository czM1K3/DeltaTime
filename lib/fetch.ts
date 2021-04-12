import { JSDOM } from "jsdom";


export const getData = async () => {
    return await fetch("https://delta-skola.bakalari.cz/Timetable/Public/Permanent/Class/38").then(x => x.text()).then(text => {
        const dom = new JSDOM(text);
        const array = [];
        dom.window.document.querySelectorAll("#main > div:nth-child(3) > div.bk-cell-wrapper > div:nth-child(2) > div > div > div > div.middle").forEach(x=>array.push(x.innerHTML));
        return array;
    }).catch(() => {
        return null;
    });
}