import { useState, useEffect } from "react";
import Preview from "./Preview";
import BtnsPosNeg from "./BtnsPosNeg";

function Card(props) {
    const [dataOBJ, setDataOBJ] = useState({ links: []});
    const [passed, setPassed] = useState(0)

    useEffect(() => {
        fetch("/data/" + props.titleCode + ".html")
            .then((response) => response.text())
            .then((text) => {
                console.log('Card Fetch', props.titleCode);
                const obj = dataStructuring(text);
                setDataOBJ(obj)
            })
            .catch((err) => {
                console.error("Fetch error "+props.titleCode);
                setDataOBJ({ description: err });
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Card">
            <BtnsPosNeg passed={passed} func={btnAnswer}/>
            <h3>{dataOBJ.title}</h3>
            { dataOBJ.abbr ? <h4>{dataOBJ.abbr}</h4> : null }
            <hr />
            <div dangerouslySetInnerHTML={{__html: dataOBJ.description}} />
            <ul>
                {dataOBJ.links.map((item) => {
                    const [urlTitle, url, key] = item;
                    return (
                        <li key={key}>
                            <a href={url} target='_blank' rel='noreferrer'>{urlTitle}
                            <Preview url={url} /></a>
                        </li>
                    );
                })}
            </ul>
            <hr />
        </div>
    );

    function btnAnswer(answer) {
        setPassed(answer)
        props.funcPosNeg(answer, props.titleCode, dataOBJ.title);
    }
}

export default Card;

function dataStructuring(text) {
    const allLines = text.split(/\r?\n/);
    const trimLines = allLines.map((line) => line.trim());
    const lines = trimLines.filter((line) => line !== "");
    const BASE_LINE = 0
    const title = lines[BASE_LINE];
    let abbr = null;
    let startIndex = BASE_LINE + 1;
    if (lines[BASE_LINE+1] === "%%") {
        abbr = lines[BASE_LINE + 2];
        startIndex += 2;
    }

    let description = "";
    let hasLinks = false;
    for (let i = startIndex; i < lines.length; i++) {
        if (lines[i] === "%%") {
            startIndex = i + 1;
            hasLinks = true;
            break;
        }
        description += lines[i];
    }

    const links = [];
    if (hasLinks) {
        for (let i = startIndex; i < lines.length; i += 2) {
            links.push([lines[i], lines[i + 1], i]);
        }
    }
    const data = {
        title,
        abbr,
        description,
        links,
        passed: 0
    };

    return data;
}
