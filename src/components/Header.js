import { useState } from 'react'

import './Header.css'
import './Modal.css'
import AdvSearch from './AdvSearch'

export default function Header({ openAliasEvent, fullCollection, openAlias }) {
    const [isFirstRun, setIsFirstRun] = useState(true)
    const [fullListVisibility, setFullListVisibility] = useState(true)

    return (
        <>
            <div className='container-header'>
                <AdvSearch openAlias={openAlias} fullCollection={fullCollection} />
                <form className='search-form' onSubmit={openAliasEvent}>
                    <div className='text-field__icon'>
                        {/* <label htmlFor='alias'>Поиск</label> */}
                        <input
                            className='text-field__input'
                            type='text'
                            name='alias'
                            defaultValue='CSS'
                            placeholder='alias'
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
                    </div>
                    <button
                        className='header__btn'
                        type='submit'
                        value='open'
                        title='Поднять наверх'
                    >
                        <i className='fa fa-arrow-up' />
                    </button>
                    <button
                        className='header__btn'
                        type='submit'
                        value='openNewPage'
                        title='Открыть в новой вкладке'
                    >
                        <i className='fa fa-file-text-o' />
                    </button>
                </form>
                <button
                    className='header__btn'
                    onClick={ShowHideModalFullLit}
                    title='Открыть полный список'
                >
                    <i className='fa fa-list-alt' />
                </button>
            </div>
            <div>{!isFirstRun && <ModalFullList visibility={fullListVisibility} />}</div>
        </>
    )

    function ShowHideModalFullLit() {
        console.log('ShowHideModalFullLit')
        console.log('isFirstRun', isFirstRun)
        if (isFirstRun) {
            setIsFirstRun(false)
        } else {
            setFullListVisibility(!fullListVisibility)
        }
    }

    function ModalFullList(props) {
        let visibility
        if (props.visibility) visibility = 'block'
        else visibility = 'none'

        return (
            <div className='modal-list' style={{ display: visibility }}>
                <button className='modal-list__button' onClick={ShowHideModalFullLit}>
                    &times;
                </button>
                <div className='modal-list__body'>
                    {fullCollection.map((item, index) => {
                        return (
                            <div
                                className='modal-list__item'
                                onClick={() => openAlias(item.alias)}
                                key={item.alias}
                            >
                                <span className='modal-list__number'>
                                    {(index + 1).toString().padStart(3, '0')}
                                </span>{' '}
                                {item.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
