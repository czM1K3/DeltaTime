import { JSDOM } from "jsdom";

export const getTimetable = async (classId) => {
    return await fetch(
        "https://delta-skola.bakalari.cz/Timetable/Public/Permanent/Class/" +
            classId
    )
        .then((x) => x.text())
        .then((text) => {
            const dom = new JSDOM(text);
            // @ts-ignore
            const labelRaw = Array.from(
                dom.window.document.querySelectorAll("#selectedClass > option")
                // @ts-ignore
                ).filter(x => x.selected)[0].innerHTML;
            const myRe = new RegExp('[1-4].[A-B]', 'mg');
            const filtered = myRe.exec(labelRaw);
            const label = filtered[0];
            const timetable = [];
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
                timetable.push(dayarray);
            }
            return { timetable, label };
        })
        .catch(() => {
            return null;
        });
};

export const getAllClasses = async () => {
    return await fetch(
        "https://delta-skola.bakalari.cz/Timetable/Public"
    )
        .then((x) => x.text())
        .then((text) => {
            const dom = new JSDOM(text);
            const list = Array.from(dom.window.document.querySelectorAll("#selectedClass > option"));
            return list.map(x => {
                // @ts-ignore
                const text = x.innerHTML;
                // @ts-ignore
                const id = x.value;
                const myRe = new RegExp('[1-4].[A-B]', 'mg');
                const filtered = myRe.exec(text);
                return { filtered, id };
            }).filter((x) => x.filtered != null).map(x => {
                return {classId: x.id, label: x.filtered[0]}
            });
        })
        .catch(() => {
            return null;
        });
};
