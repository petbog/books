import React, { useState } from 'react';
import { FC } from 'react';
import s from './HomePage.module.scss'
import { Input } from '../../ui/Input/Input.tsx';
import SelectComponent from '../../ui/Select/SelectComponent.tsx';


const HomePage: FC = () => {

    const [scrollImg, setScrollImg] = useState<boolean>(false)
console.log(scrollImg)

    const handlImg = () => {
        setScrollImg(!scrollImg)
    }


    return (
        <div className={!scrollImg ? `${s.home}  ${s.imgMax}` : `${s.home} ${s.imgMin}`} >
            <button onClick={handlImg}>button</button>
            <div className="">
                <h1 className={s.home_title}>searching for books</h1>
            </div>
            <div className={s.home_inputbox}>
                <Input placeholder={'search books'} />
            </div>

            <div className={s.home_select}>
                <SelectComponent title="Categoties" />
                <SelectComponent title="Sorting by" />
            </div>

        </div >
    );
};

export default HomePage;