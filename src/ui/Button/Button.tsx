import  { FC } from 'react';
import s from './button.module.scss'

type ButtonProps = {
    text : string,
    clickButton:boolean,
    setClickButton:(value:boolean)=>void
}

export const Button: FC<ButtonProps> = ({ text,clickButton,setClickButton }) => {

const handleClick=()=>{
    setClickButton(!clickButton)
}

    return (
        <button onClick={handleClick} className={s.Button}>
            {text}
        </button>
    )
}
