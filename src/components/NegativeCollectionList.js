// import { useState, useEffect } from "react";
import "./NegativeCollectionList.css";

export default function NegativeCollectionList(props) {
    console.log("FUNC NegativeCollectionList", props.array);
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
