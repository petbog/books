import React, { FC } from 'react';
import s from './button.module.scss'

type ButtonProps = {
    children: string
}

export const Button: FC<ButtonProps> = ({ children }) => {
    return (
        <button className={s.Button}>
            {children}
        </button>
    )
}
