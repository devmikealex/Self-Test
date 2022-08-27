import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const COLLECTION_URL = "/data/collection.json";

let fullCollection = [];
let reservedCollection = [];

function App() {
    const [openedCollection, setOpenedCollection] = useState([]);
    const [btnName, setBtnName] = useState("Get Random Card");
    const [positiveResponse, setPositiveResponse] = useState(0);
    const [negativeResponse, setNegativeResponse] = useState(0);
    
    useEffect(() => {
        // const queryString = window.location.search.substring(7);
        const searchParams = new URLSearchParams(window.location.search.substring(1));
        const queryString = searchParams.get("alias")
        console.log("alias queryString = ", queryString);
        fetch(COLLECTION_URL)
            .then((response) => response.json())
            .then((jsonList) => {
                fullCollection = jsonList;
                reservedCollection = fullCollection.map((x) => x.alias);

                const newCollection = openCard(queryString)
                if (newCollection) setOpenedCollection(newCollection)
                console.log("newCollection", newCollection);

                // let cardForOpen = [queryString]
                // if (!queryString) {
                //     cardForOpen = reservedCollection.splice(Math.floor(Math.random() * reservedCollection.length), 1);
                // }
                // setOpenedCollection((oldArray) => [cardForOpen[0], ...oldArray]);
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function button() {
        // console.log("BUTTON");
        const newCollection = openCard()
        if (newCollection) setOpenedCollection(newCollection)
        // console.log("newCollection", newCollection);
        return
        // if (reservedCollection.length) {
        //     const cardForOpen = reservedCollection.splice(Math.floor(Math.random() * reservedCollection.length), 1);
        //     if (!reservedCollection.length) {
        //         setBtnName("FIANL")
        //     }
        //     setOpenedCollection((oldArray) => [cardForOpen[0], ...oldArray]);
        // } else {
        //     setOpenedCollection((oldArray) => ['final', ...oldArray]);
        // }
    }

    function openCard(cardAlias) {
        console.log("FUN openCard", cardAlias);
        // console.log("reservedCollection", reservedCollection);
        // console.log("openedCollection", openedCollection);
        if (reservedCollection.length) {
            let cardForOpen = [cardAlias];
            let indexCardForOpen;
            if (cardAlias===undefined) {
                indexCardForOpen = Math.floor(Math.random() * reservedCollection.length)
            } else {
                if (reservedCollection.includes(cardAlias)) {
                    indexCardForOpen = reservedCollection.indexOf(cardAlias)
                } else {
                    return ['error', ...openedCollection]
                }
            }
            cardForOpen = reservedCollection.splice(indexCardForOpen, 1);
            if (!reservedCollection.length) {
                setBtnName("FIANL")
            }
            return [cardForOpen[0], ...openedCollection]
        } else {
            if (openedCollection[0]!=='final') {
                return ['final', ...openedCollection]
            }
            return null
        }
    }

    function funcPosNeg(answer, alias) {
        console.log("funcPosNeg");
        console.log(answer, alias);
        console.log(positiveResponse, negativeResponse);
        if (answer === 1) {
            setPositiveResponse(old => old + 1)
        } else {
            setNegativeResponse(old => old + 1)
        }
    }

    return (
        <div className="App">
            <div>{positiveResponse} - {negativeResponse}</div>
            {/* <button onClick={button2}>button2</button> */}
            <button onClick={button}>{btnName}</button>
            {openedCollection.map((alias) => (
                <Card titleCode={alias} key={alias} funcPosNeg={funcPosNeg} />
            ))}
        </div>
    );
}

export default App;
