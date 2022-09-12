import './Header.css'
import AdvSearch from './AdvSearch'

export default function Header({ openAliasEvent, fullCollection, openAlias }) {
    return (
        <div className='container-header'>
            <form onSubmit={openAliasEvent}>
                <div className='text-field__icon'>
                    <label htmlFor='alias'>Поиск</label>
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
                <button type='submit' value='open'>
                    <i className='fa fa-arrow-up' /> Open Top
                </button>
                <button type='submit' value='openNewPage'>
                    <i className='fa fa-file-text-o' /> Open Page
                </button>
            </form>
            <AdvSearch openAlias={openAlias} fullCollection={fullCollection} />
        </div>
    )
}
