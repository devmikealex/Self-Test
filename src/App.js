import { useState, useEffect } from "react";
import Card from "./components/Card";
import NegativeCollectionList from "./components/NegativeCollectionList";
import "./App.css";

const COLLECTION_URL = "/data/collection.json";
const RANDOM_BUTTON_DEFAULT = "Get Random Card";

let fullCollection = [];
let reservedCollection = [];

export default function App() {
    const [openedCollection, setOpenedCollection] = useState([]);
    const [negativeCollection, setNegativeCollection] = useState([]);
    const [btnName, setBtnName] = useState(RANDOM_BUTTON_DEFAULT);
    const [positiveResponse, setPositiveResponse] = useState(0);
    const [negativeResponse, setNegativeResponse] = useState(0);
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search.substring(1));
        const queryString = searchParams.get("alias")
        console.log("alias queryString = ", queryString);

        // TODO загрузить negativeCollection из Local Storage

        fetch(COLLECTION_URL)
            .then((response) => response.json())
            .then((jsonList) => {
                fullCollection = jsonList;
                reservedCollection = fullCollection.map((x) => x.alias);
                const newCollection = openCard(queryString)
                if (newCollection) setOpenedCollection(newCollection)
                console.log("newCollection", newCollection);
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function button() {
        const newCollection = openCard()
        if (newCollection) setOpenedCollection(newCollection)
    }

    function openCard(cardAlias) {
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
                setBtnName("Final")
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
        if (answer === 'pos') {
            setPositiveResponse(old => old + 1)
        } else { // 'neg'
            setNegativeResponse(old => old + 1)

            // TODO сохранить в Local Storage
            
            setNegativeCollection((old)=>{
                return [...old, [alias, title]]
            })
        }
    }

    function funcBtnShowOnTOP(alias) {
        const indexForOpen = openedCollection.indexOf(alias)
        const cardForOpen = openedCollection.splice(indexForOpen, 1)
        setOpenedCollection([cardForOpen[0], ...openedCollection]);
    }

    return (
        <div className="App">
            <div className="container-header">
                <button className="btns random-btn" onClick={button}>&#9851; {btnName}</button>
                <NegativeCollectionList array={negativeCollection} funcBtn={funcBtnShowOnTOP} />
                <ShowResponseCounter />
            </div>
            <div className="container-card">
                {openedCollection.map((alias) => (
                    <Card titleCode={alias} key={alias} funcPosNeg={funcPosNeg} />
                ))}
            </div>
        </div>
    );
    
    function ShowResponseCounter() {
        if (negativeResponse+positiveResponse) {
            return (
            <div className="response-counter">Помню: {positiveResponse} - 
            Не помню: {negativeResponse}</div>
            )
        }
        return null
    }
}

