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
    // console.log(e.target)
    if (e.target.tagName === 'INPUT' && e.key === 'Escape') {
        e.target.value = ''
    }
}
    return (
        <div className='search-container'>
            <input
                className='search-input'
                // className='text-field__input'
                onKeyDown={onKeyDown}
                onInput={inputChange}
                onBlur={focusOUT}
                onFocus={focusIN}
                type='text'
                name='search'
                placeholder='поиск'
            />
            <span className='text-field__icon-left'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                >
                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
            </span>
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
