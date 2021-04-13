import { JSDOM } from "jsdom";

export const getTimetable = async (classId) => {
    return await fetch(
        "https://delta-skola.bakalari.cz/Timetable/Public/Permanent/Class/" +
            classId
    )
        .then((x) => x.text())
        .then((text) => {
            const dom = new JSDOM(text);
            const list = [];
            for (let forday = 0; forday <= 4; forday++) {
                const dayarray = [];
                for (let forlesson = 0; forlesson <= 10; forlesson++) {
                    const nodeList = dom.window.document.querySelectorAll(
                        "#main > div:nth-child(" +
                            (forday + 2) +
                            ") > div.bk-cell-wrapper > div:nth-child(" +
                            (forlesson + 1) +
                            ") > div > div > div > div.middle"
                    );
                    //@ts-ignore
                    dayarray.push(Array.from(nodeList).map((x) => x.innerHTML));
                }
                list.push(dayarray);
            }
            return list;
        })
        .catch(() => {
            return null;
        });
};

export const getTimetableSingle = async (classId, day, lesson) => {
    return await fetch(
        "https://delta-skola.bakalari.cz/Timetable/Public/Permanent/Class/" +
            classId
    )
        .then((x) => x.text())
        .then((text) => {
            const dom = new JSDOM(text);
            const nodeList = dom.window.document.querySelectorAll(
                "#main > div:nth-child(" +
                    (day + 2) +
                    ") > div.bk-cell-wrapper > div:nth-child(" +
                    (lesson + 1) +
                    ") > div > div > div > div.middle"
            );
            //@ts-ignore
            return Array.from(nodeList).map((x) => x.innerHTML);
        })
        .catch(() => {
            return null;
        });
};
