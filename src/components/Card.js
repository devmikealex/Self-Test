import { useState, useEffect } from "react";
import Preview from "./Preview";
import BtnsPosNeg from "./BtnsPosNeg";

// let obj = {
//     links: [],
// };

function Card(props) {
    // const [dataHTML, setDataHTML] = useState({ __html: "Loading..." });
    const [dataOBJ, setDataOBJ] = useState({ links: []});
    const [passed, setPassed] = useState(0)

    // console.warn("Card", props.titleCode)

    useEffect(() => {
        // console.warn("useEffect", props.titleCode)
        // ! ddddddddd
        fetch("/data/" + props.titleCode + ".html")
        // fetch("/data/pseudoClass.html")
            .then((response) => response.text())
            .then((text) => {
                console.log('Card Fetch', props.titleCode);
                // setDataHTML({__html: dataStructuring(text)});
                const obj = dataStructuring(text);
                // setDataHTML({ __html: obj.description });
                setDataOBJ(obj)
                // console.info ("text = ", text);
            })
            .catch((err) => {
                console.error("Fetch error "+props.titleCode);
                setDataOBJ({ description: err });
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log("dataOBJ.title = ", dataOBJ.title);
    // console.log("dataOBJ.abbr = ", dataOBJ.abbr);
    // console.log("dataOBJ.description = ", dataOBJ.description);
    // console.log("dataOBJ.links = ", dataOBJ.links);

    return (
        <div className="Card">
            {/* <h2>{props.titleCode}</h2> */}
                <BtnsPosNeg passed={passed} func={a}/>
            <h3>{dataOBJ.title}</h3>
            
            { dataOBJ.abbr ? <h4>{dataOBJ.abbr}</h4> : null }
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

    function a(answer) {
        // setDataOBJ((old) => {
        //     return { ...old, passed: answer };
        // });
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
        passed: 0
    };

    return data;
}
