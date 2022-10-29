import { useState, useEffect, useCallback } from "react";
import Card from "./components/Card";
import NegativeCollectionList from "./components/NegativeCollectionList";
import Header from "./components/Header";
import SideCount from "./components/SideCount";
import "./App.css";

const COLLECTION_URL = "/data/collection.json";
const RANDOM_BUTTON_DEFAULT = "Случайная карточка";

let fullCollection = [];
let reservedCollection = [];
let queryString;
let genGetID = getID();

export default function App() {
    const [openedCollection, setOpenedCollection] = useState([]);
    const [negativeCollection, setNegativeCollection] = useState([]);
    const [btnName, setBtnName] = useState(RANDOM_BUTTON_DEFAULT);
    const [positiveResponse, setPositiveResponse] = useState(0);
    const [negativeResponse, setNegativeResponse] = useState(0);

    function randomButton() {
        console.log('randomButton');
        console.log('openedCollection', openedCollection);
        const newCollection = openCard();
        if (newCollection) setOpenedCollection(newCollection);
    }

    const handleKeyPress = useCallback((event) => {
        // console.log(`Key pressed: ${event.key}`);
        // console.log("---", openedCollection);
        // if (event.key === 'Escape') {
        //     console.log('ESC--------');
        // }
        if (event.key === ' ') {
            event.preventDefault();
            if(!event.repeat) {
                randomButton()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedCollection]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search.substring(1));
        queryString = searchParams.get("alias");
        console.log("alias queryString = ", queryString);

        // загрузить negativeCollection из Local Storage
        let defaultNC = JSON.parse(localStorage.getItem('negativeCollection'))
        if (!defaultNC) {
            defaultNC = []
        }
        setNegativeCollection(defaultNC);
        console.info('LOAD localStorage: ', defaultNC);

        fetch(COLLECTION_URL)
            .then((response) => response.json())
            .then((jsonList) => {
                fullCollection = jsonList;
                reservedCollection = fullCollection.map((x) => x.alias);
                const newCollection = openCard(queryString);
                if (newCollection) setOpenedCollection(newCollection);
                console.log("newCollection", newCollection);
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        ChangeDocTitle(openedCollection[0])
        window.scrollTo(0, 0)
    }, [openedCollection]);

    function openCard(cardAlias) {
        console.log('FUNC openCard');
        console.log('cardAlias', cardAlias);
        console.log('openedCollection', openedCollection);
        if (reservedCollection.length) {
            let cardForOpen = [cardAlias];
            let indexCardForOpen;
            if (!cardAlias) {
                indexCardForOpen = Math.floor(Math.random() * reservedCollection.length);
            } else {
                if (reservedCollection.includes(cardAlias)) {
                    indexCardForOpen = reservedCollection.indexOf(cardAlias);
                } else {
                    console.warn(`Alias '${cardAlias}' not found in collection`);
                    // return ["_notfound_" + cardAlias + "_" + (new Date()).getTime(), ...openedCollection];
                    return ["_notfound_" + cardAlias + "_" + genGetID.next().value, ...openedCollection];
                }
            }
            cardForOpen = reservedCollection.splice(indexCardForOpen, 1);
            if (!reservedCollection.length) {
                setBtnName("Final");
            }
            return [cardForOpen[0], ...openedCollection];
        } else {
            // if (openedCollection[0] !== "final") {
            if (!openedCollection.includes("_final")) {
                return ["_final", ...openedCollection];
            }
            return null;
        }
    }

    function funcPosNeg(answer, alias, title) {
        if (answer === 'pos') {
            setPositiveResponse((old) => old + 1);
        } else {
            // === 'neg'
            setNegativeResponse((old) => old + 1);

            // сохранить в Local Storage
            const newA = negativeCollection.filter ( (item) => {
                // подготовка к проверки на наличие элемента alias (newA.length > 0)
                return item[0] === alias;
            })
            if (!newA.length) {
                setNegativeCollection((old) => {
                    const newNC = [...old, [alias, title]]
                    saveNegColToLocStor(newNC)
                    return newNC;
                });
            }
        }
    }

    function funcBtnShowOnTOP(alias, mode) {
        console.log('mode',mode)
        if (mode === 'DEL') {
            // удалить alias из negativeCollection
            let indexForDelete = 0;
            for (const item of negativeCollection) {
                if (item[0] === alias) break
                indexForDelete++;
            }
            negativeCollection.splice(indexForDelete, 1);
            console.log(`funcBtnShowOnTOP - indexForDelete: ${indexForDelete} alias: ${alias}`);
            setNegativeCollection([...negativeCollection])
            saveNegColToLocStor(negativeCollection)
            return
        }
        const indexForOpen = openedCollection.indexOf(alias);
        let onTopElement;
        console.log(`funcBtnShowOnTOP - indexForOpen: ${indexForOpen} alias: ${alias}`);
        if (indexForOpen === -1) {
            onTopElement = alias
        } else {
            const cardForOpen = openedCollection.splice(indexForOpen, 1);
            onTopElement = cardForOpen[0]
        }
        setOpenedCollection([onTopElement, ...openedCollection]);
        // ChangeDocTitle(alias)
    }

    function saveNegColToLocStor(array) {
        const arrayString = JSON.stringify(array)     
        localStorage.setItem('negativeCollection', arrayString);
        console.info('SAVE localStorage: ', arrayString);
    }

    function funcBtnClear (){
        console.log('funcBtnClear');
        setNegativeCollection([])
        saveNegColToLocStor([])
    }

    // function openOnTop(e){
    //     e.preventDefault()
    //     const alias = e.target.alias.value
    //     funcBtnShowOnTOP(alias)
    // }
    // function openNewPage(e){
    //     e.preventDefault()
    //     const alias = e.target.alias.value
    //     window.open(`${window.location.pathname}?alias=${alias}`, "_blank");
    // }
    function openAliasEvent(e){
        e.preventDefault()
        let alias = e.target.alias.value
        console.log("🚀 ~ file: App.js ~ line 179 ~ openAliasEvent ~ alias", alias)
        console.log(typeof alias);
        
        if (alias.endsWith('.html')) alias = alias.slice(0, -5)
        switch (e.nativeEvent.submitter.value) {
            case 'open':
                openAlias(alias)
                break;
            case 'openNewPage':
                window.open(`${window.location.pathname}?alias=${alias}`, "_blank");
                break;      
            default:
        }
    }
    function openAlias(alias) {
        // window.scrollTo(0, 0);
        if(openedCollection.includes(alias)){
            funcBtnShowOnTOP(alias)
        } else {
            const newCollection = openCard(alias);
            if (newCollection) setOpenedCollection(newCollection);
        } 
    }

    return (
        <div className="App">
            <Header openAliasEvent={openAliasEvent} openAlias={openAlias} fullCollection={fullCollection} />
            {/* <div className="side-counter">{`${fullCollection.length}/${openedCollection.length}`}</div> */}
            <SideCount fullCollectionlength = {fullCollection.length} openedCollectionlength = {openedCollection.length}/>
            <div className="container-footer">
                <div className="columns3-footer">
                    <div className="footer1"><ShowResponseCounterPos/></div>
                    <div className="footer2">
                        <button className="btns random-btn" onClick={randomButton}>
                            &#9851; {btnName}
                        </button>
                    </div>
                    <div className="footer3"><ShowResponseCounterNeg/></div>
                </div>
                <NegativeCollectionList array={negativeCollection} funcBtn={funcBtnShowOnTOP} funcBtnClear={funcBtnClear} />
                {/* <ShowResponseCounter /> */}
            </div>
            <div className="container-card">
                {openedCollection.map((alias) => (
                    <Card titleCode={alias} key={alias} funcPosNeg={funcPosNeg} queryString={queryString} />
                ))}
            </div>
        </div>
    );

    function ShowResponseCounterPos() {
        if (positiveResponse) {
            return (
                <div className="response-counter">
                    Помню: {positiveResponse}
                </div>
            );
        }
        return null;
    }

    function ShowResponseCounterNeg() {
        if (negativeResponse) {
            return (
                <div className="response-counter">
                    Не помню: {negativeResponse}
                </div>
            );
        }
        return null;
    }

    // function ShowResponseCounter() {
    //     if (negativeResponse + positiveResponse) {
    //         return (
    //             <div className="response-counter">
    //                 Помню: {positiveResponse} - Не помню: {negativeResponse}
    //             </div>
    //         );
    //     }
    //     return null;
    // }
}

function ChangeDocTitle(alias) {
    console.log('ChangeDocTitle', alias);
    if (alias && fullCollection.length>0) {
        let item = fullCollection.find((item) => 
            item.alias === alias
        )
        // let title
        // if (item) {
        //     title = item.title
        // } else {
        //     title = 'Error'
        // }
        // document.title = `${title} - Self Test`;
        item ??= {title: 'Error'}
        document.title = `${item.title} - Self Test`;

    }
}

function *getID() {
    let id = 0
    while (1) {
        id++
        yield id
    }
}