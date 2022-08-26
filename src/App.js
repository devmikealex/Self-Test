import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const COLLECTION_URL = "/data/collection.json";

let fullCollection = [];
let reservedCollection = [];

function App() {
    const [openedCollection, setOpenedCollection] = useState([]);
    const [btnName, setBtnName] = useState("Get Random Card");

    useEffect(() => {
        const queryString = window.location.search.substring(7);
        console.log("queryString = ", queryString);
        fetch(COLLECTION_URL)
            .then((response) => response.json())
            .then((jsonList) => {
                fullCollection = jsonList;
                reservedCollection = fullCollection.map((x) => x.alias);
                let cardForOpen = [queryString]
                if (!queryString) {
                    cardForOpen = reservedCollection.splice(Math.floor(Math.random() * reservedCollection.length), 1);
                }
                setOpenedCollection((oldArray) => [cardForOpen[0], ...oldArray]);
            })
            .catch((err) => console.log(err));
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
        // console.log("FUN openCard", cardAlias);
        // console.log("reservedCollection", reservedCollection);
        // console.log("openedCollection", openedCollection);
        if (reservedCollection.length) {
            let cardForOpen = [cardAlias];
            let a;
            if (cardAlias===undefined) {
                a = Math.floor(Math.random() * reservedCollection.length)
            } else {
                a = reservedCollection.indexOf(cardAlias)
            }
            cardForOpen = reservedCollection.splice(a, 1);
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
    // for test
    // const openedCollection2 = [ "HTML", "JSON" ]
    function button2() {
        setOpenedCollection([0])
    }

    return (
        <div className="App">
            <h1 className="test">START!</h1>
            {/* <button onClick={button2}>button2</button> */}
            <button onClick={button}>{btnName}</button>
            {openedCollection.map((alias) => (
                <Card titleCode={alias} key={alias} />
            ))}
        </div>
    );
}

export default App;
