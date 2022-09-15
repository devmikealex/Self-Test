// import { useState, useEffect } from 'react'
// import { useState } from 'react'
import './SideCount.css'

function SideCount(props) {
    const { fullCollectionlength, openedCollectionlength } = props

    // const [, set] = useState()
    // const [isFirstRun, setIsFirstRun] = useState(true)
    // const [fullListVisibility, setFullListVisibility] = useState(true)

    // useEffect(() => {
    //     console.log('useEffect')
    // }, [])

    // if(isFirstRun){

    // } else {

    // }

    return (
            <div className='side-counter'>
                {`${fullCollectionlength}/${openedCollectionlength}`}
            </div>
    )

    // function ShowHideModalFullLit() {
    //     console.log('ShowHideModalFullLit');
    //     console.log("isFirstRun", isFirstRun)
    //     if (isFirstRun){
    //         setIsFirstRun(false)
    //     } else {
    //         setFullListVisibility(!fullListVisibility)
    //     }
    // }

    // function ModalFullList(props) {
    //     let visibility
    //     if (props.visibility) visibility = "block"
    //     else visibility = "none"

    //     return (
    //         <div style={{display: visibility}}>
    //             - - - ShowModalFullLit - - -
    //             {/* map */}
    //         </div>
    //     )
    // }
}

export default SideCount
