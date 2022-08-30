import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import NegativeCollectionList from "./components/NegativeCollectionList";

const COLLECTION_URL = "/data/collection.json";

let fullCollection = [];
let reservedCollection = [];
// let negativeCollection = [];

function App() {
    const [openedCollection, setOpenedCollection] = useState([]);
    const [negativeCollection, setNegativeCollection] = useState([]);
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
        console.log("reservedCollection", reservedCollection);
        console.log("openedCollection", openedCollection);
        if (reservedCollection.length) {
            let cardForOpen = [cardAlias];
            let indexCardForOpen;
            if (!cardAlias) {
                indexCardForOpen = Math.floor(Math.random() * reservedCollection.length)
            } else {
                if (reservedCollection.includes(cardAlias)) {
                    indexCardForOpen = reservedCollection.indexOf(cardAlias)
                } else {
                    console.warn(`Alias ${cardAlias} not found in collection`);
                    return ['notfound', ...openedCollection]
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

    function funcPosNeg(answer, alias, title) {
        console.log("funcPosNeg");
        console.log(answer, alias, title);
        console.log(positiveResponse, negativeResponse);
        if (answer === 1) {
            setPositiveResponse(old => old + 1)
        } else {
            setNegativeResponse(old => old + 1)
            setNegativeCollection((old)=>{
                console.log('OLD', old);
                return [...old, [alias, title]]
            })
        }
    }

    function funcBtnShowOnTOP(alias) {
        console.log('funcBtnShowOnTOP');
        console.log('alias', alias);
        // найти алиас в массивл openedCollection
        const indexForOpen = openedCollection.indexOf(alias)
        console.log('indexForOpen', indexForOpen);
        // вырезать его
        const cardForOpen = openedCollection.splice(indexForOpen, 1)
        console.log('cardForOpen', cardForOpen);
        // шифт в начало массива
        setOpenedCollection([cardForOpen[0], ...openedCollection]);
    }

    return (
        <div className="App">
            <div>{positiveResponse} - {negativeResponse}</div>
            <NegativeCollectionList array={negativeCollection} funcBtn={funcBtnShowOnTOP} />
            <button onClick={button}>{btnName}</button>
            {openedCollection.map((alias) => (
                <Card titleCode={alias} key={alias} funcPosNeg={funcPosNeg} />
            ))}
        </div>
    );
}

export default App;
