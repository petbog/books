import React from 'react';
import { FC } from 'react';
import s from './HomePage.module.scss'
import { Input } from '../../ui/Input/Input.tsx';
import SelectComponent from '../../ui/Select/SelectComponent.tsx';


const HomePage: FC = () => {
    return (
        <div className={s.home} >
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