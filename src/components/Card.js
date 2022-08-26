import { useState, useEffect } from "react";
import Preview from "./Preview";

let obj = {
    links: [],
};

function Card(props) {
    const [dataHTML, setDataHTML] = useState({ __html: "Loading..." });

    useEffect(() => {
        // ! ddddddddd
        fetch("/data/" + props.titleCode + ".html")
        // fetch("/data/pseudoClass.html")
            .then((response) => response.text())
            .then((text) => {
                // setDataHTML({__html: dataStructuring(text)});
                obj = dataStructuring(text);
                setDataHTML({ __html: obj.description });
            })
            .catch((err) => {
                setDataHTML({ __html: err });
            });
    }, [props.titleCode]);

    return (
        <div className="Card">
            {/* <h2>{props.titleCode}</h2> */}
            <h3>{obj.title}</h3>
            
            { obj.abbr ? <h4>{obj.abbr}</h4> : null }
            <div dangerouslySetInnerHTML={dataHTML} />
            <ul>
                {obj.links.map((item) => {
                    const [urlTitle, url, key] = item;
                    return (
                        <li key={key}>
                            <a href={url} target='_blank' rel='noreferrer'>{urlTitle}
                            <Preview url={url} /></a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
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
        // description += "<p>" + lines[i] + "</p>";
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
    };

    return data;
}
