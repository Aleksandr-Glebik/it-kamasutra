import React from 'react'
import preloader from '../../../assets/img/preloader.svg'

type PropsType = {

}

let Preloader: React.FC = () => {
    return (
        <img src={preloader} />
    )
}

export default Preloader