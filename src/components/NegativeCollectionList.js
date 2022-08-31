// import { useState, useEffect } from "react";
import "./NegativeCollectionList.css";

export default function NegativeCollectionList (props) {
    console.log(props.array);

    return (
        <div>
            {props.array.map((item)=>{
                const [alias, title] = item
                return <button className="negative-btn" onClick={() => props.funcBtn(alias)} key={alias}>{title}</button>
            })}
        </div>
    )
}
