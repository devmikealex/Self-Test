import { useEffect } from "react";
import "./NegativeCollectionList.css";

export default function NegativeCollectionList(props) {
    console.log("FUNC NegativeCollectionList", props.array);

    useEffect(() => {
        // The After-Render Hook
        
        // const clientHeight = document.getElementsByClassName('container-footer')[0].clientHeight;
        // console.log("🚀 ~ file: NegativeCollectionList.js ~ line 10 ~ useEffect ~ clientHeight", clientHeight)
        const offsetHeight = +document.getElementsByClassName('container-footer')[0].offsetHeight;
        console.log("🚀 ~ file: NegativeCollectionList.js ~ line 12 ~ useEffect ~ offsetHeight", offsetHeight)
        // clientHeight includes padding.
        // offsetHeight includes padding, scrollBar and borders.
        const c = document.getElementsByClassName('container-card')[0]
        c.style.marginBottom = `${offsetHeight+10}px`
    });

    if (props.array.length) {
        return (
            <div>
                {props.array.map((item) => {
                    const [alias, title] = item;
                    return (
                        <button className="negative-btn" onClick={() => props.funcBtn(alias)} key={alias}>
                            {title}
                            <span className="negative-btn-IDclear" onClick={(e)=>{
                                console.log(e);
                                e.stopPropagation();
                                props.funcBtn(alias, 'DEL')
                                }}>&#10006;</span>
                        </button>
                    );
                })}
                {/* clear all button */}
                <button className="negative-btn negative-btn-clear" onClick={props.funcBtnClear}>
                    &#10006;
                </button>
            </div>
        );
    } else return null;
}
