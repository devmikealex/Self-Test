import { useState, useEffect } from "react";
import Preview from "./Preview";
import BtnsPosNeg from "./BtnsPosNeg";
import "./Card.css";

export default function Card(props) {
    const [dataOBJ, setDataOBJ] = useState({ links: []});
    const [passed, setPassed] = useState('none')

    useEffect(() => {
        let titleCode = props.titleCode
        if (titleCode.includes('_notfound_')) {
            titleCode = '_notfound'
        }       
        fetch("/data/" + titleCode + ".html")
            .then((response) => response.text())
            .then((text) => {
                console.log('Card Fetch', props.titleCode);
                const obj = dataStructuring(text);
                if (props.titleCode.includes('_notfound_')) {
                    obj.abbr = props.titleCode
                }
                setDataOBJ(obj)
            })
            .catch((err) => {
                console.error("Fetch error "+props.titleCode);
                setDataOBJ({ description: err });
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let passed2 = passed
    if (props.queryString === props.titleCode) {
        passed2 = 'neutral'
    }
    let noButtonsArray = [props.queryString, '_final', '_notfound', '_error']
    if (props.titleCode.includes('_notfound_')) {
        passed2 = 'error'
        noButtonsArray.push(props.titleCode)
    }

    return (
        <div className={"card " + passed2}>
            <h2><a href={`/?alias=${props.titleCode}`}>{dataOBJ.title}</a></h2>
            { dataOBJ.abbr ? <h3>{dataOBJ.abbr}</h3> : null }
            <div className={"secret " + passed2}>
                <hr />
                <div dangerouslySetInnerHTML={{__html: dataOBJ.description}} />
                <LinksList />
            </div>
            {noButtonsArray.includes(props.titleCode)
                ? null
                : <BtnsPosNeg passed={passed} func={btnAnswer}/>}
        </div>
    );

    function LinksList () {
        if (dataOBJ.links.length) {
            return (
                <><hr />
                <ul>
                    {dataOBJ.links.map((item) => {
                        const [urlTitle, url, key] = item;
                        let newURL = url
                        if (url.startsWith('?alias=')) {
                            let pageURL = window.location.pathname
                            // let pageURL = window.location.href
                            // const s = pageURL.indexOf('?')
                            // if (s !== -1) {
                            //     pageURL = pageURL.slice(0, s)
                            // }
                            newURL = pageURL + url
                        }
                        return (
                            <li key={key}>
                                <a href={newURL} target='_blank' rel='noreferrer'>{urlTitle}
                                <Preview url={url} /></a>
                            </li>
                        );
                    })}
                </ul></>
            )
        }
        return null
    }

    function btnAnswer(answer) {
        setPassed(answer)
        props.funcPosNeg(answer, props.titleCode, dataOBJ.title);
    }
}

function dataStructuring(text) {
    const allLines = text.split(/\r?\n/);

    let lines=[]
    let isNotFormated = true
    for(let line of allLines) {
        if (line.includes('<pre>')) isNotFormated = false
        if (line.includes('</pre>')) isNotFormated = true
        if (isNotFormated) {
            line = line.trim()
            if (line) lines.push(line)
        } else
            lines.push(line)
    }

    // const trimLines = allLines.map(line => {
    //     if (line.includes('<pre>')) isFormated = true
    //     if (line.includes('</pre>')) isFormated = false
    //     if (!isFormated) line = line.trim()
    //     return line
    // });

    // isFormated = false
    // const lines = trimLines.filter(line => {
    //     if (line.includes('<pre>')) isFormated = true
    //     if (line.includes('</pre>')) isFormated = false    
    //     if (!isFormated) return (line !== "")
    //     return true
    // })

    const BASE_LINE = 0
    const title = lines[BASE_LINE];
    let abbr = null;
    let startIndex = BASE_LINE + 2;
    if (lines[startIndex] === "%%") {
        abbr = lines[BASE_LINE + 3];
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
        description += lines[i]+'\n';
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
        passed: 'none'
    };
    return data;
}
