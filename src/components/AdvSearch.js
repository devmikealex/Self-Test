import { useState, useEffect } from 'react'
import './AdvSearch.css'

let searchArray = []

export default function AdvSearch({ fullCollection, openAlias }) {
    const [fileredSearchArray, setFileredSearchArray] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        console.log('useEffect Header')
        searchArray = fullCollection
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullCollection])

    function inputChange(e) {
        const value = e.target.value.toLowerCase().trim()
        if (value !== '' && value.length >= 2) {
            const fileredSearchArray = searchArray.filter((item, index) => {
                return item.search.includes(value)
            })
            console.log('fileredSearchArray:', fileredSearchArray)
            setFileredSearchArray(fileredSearchArray)
        } else {
            setFileredSearchArray([])
        }
    }
    const isVisible = (!!fileredSearchArray.length) && isFocused

    function focusOUT() {
        setTimeout(() => {
            setIsFocused(false)
        }, 200);
    }
    function focusIN() {
        setIsFocused(true)
    }
function onKeyDown(e) {
    e.stopPropagation()
}
    return (
        <div className='search-container'>
            <input
                className='search-input'
                onKeyDown={onKeyDown}
                onInput={inputChange}
                onBlur={focusOUT}
                onFocus={focusIN}
                type='text'
                name='search'
                placeholder='search'
            />
            {isVisible && (
                <div className='search-item-container'>
                    {fileredSearchArray.map((item) => {
                        return (
                            <div
                                className='search-item'
                                // onClick={() => console.log('aaaaaaaa')}
                                onClick={() => openAlias(item.alias)}
                                key={item.alias}
                            >
                                {item.title}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
