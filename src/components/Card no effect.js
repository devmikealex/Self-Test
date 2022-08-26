import { useState, useEffect } from "react";

function Card(props) {
    const [htmlCode, setHTML] = useState({__html: "Loading..."});
    const [loading, setLoading] = useState(true);
    console.log('loading', loading);

    if (loading) {
        setLoading(false);
        console.log('URL', props.URL);
        fetch(props.URL)
            .then((response) => response.text())
            .then((text) => {
                console.log('fetch end');
                setHTML({__html: text});
            })
            .catch(err => {
                setHTML({__html: err});
            });
    }

    return (
        <div className="Card">
            <h2>{props.title}</h2>
            <div dangerouslySetInnerHTML={htmlCode} />
        </div>
    );
}

export default Card;