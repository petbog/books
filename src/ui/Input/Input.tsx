import { FC } from 'react'
import React from 'react'
import s from './Input.module.scss'

type inputType = {
    placeholder: string,
    value:string;
    setValue: (value: string) => void;
    clickValue:boolean
    setClickValue: (value: boolean) => void;
}

export const Input: FC<inputType> = ({ placeholder,value,setValue,setClickValue,clickValue }) => {


    const handlValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const serchValue = () => {
        setClickValue(!clickValue)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setClickValue(!clickValue)
        }
    }

    return (
        <div className="container">
            <div className={s.input}>
                <input
                    placeholder={placeholder}
                    onChange={handlValue}
                    className={s.input_item}
                    value={value}
                    type="text"
                    onKeyDown={handleKeyDown}
                />
                
                    <svg onClick={serchValue} className={s.input_serch} xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256">
                        <g fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                            <g transform="scale(5.12,5.12)">
                                <path d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z">
                                </path>
                            </g>
                        </g>
                    </svg>

            </div>
        </div>
    )
}

