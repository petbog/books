import { useEffect, useState } from 'react';
import { FC } from 'react';
import s from './HomePage.module.scss'
import { Input } from '../../ui/Input/Input';
import SelectComponent from '../../ui/Select/SelectComponent';
import { useAppDispatch } from '../../Redux';
import Books from '../../Component/Books/Books';



const HomePage: FC = () => {
    const dispatch = useAppDispatch()
    const [scrollImg, setScrollImg] = useState<boolean>(false)

    const handlImg = () => {
        setScrollImg(!scrollImg)
    }

    const serchSelectorCategories = [
        { activ: "all", label: "all" },
        { label: "art" },
        { label: "biography" },
        { label: "computers" },
        { label: "histor" },
        { label: "medical" },
        { label: "poetry" },
    ]
    const sortSelector = [
        { activ: "relevance",label: "relevance" },
        { label: "newest" },
    ]
    return (
        <div className="">
            <div className={!scrollImg ? `${s.home}  ${s.imgMax}` : `${s.home} ${s.imgMin}`} >
                <button onClick={handlImg}>button</button>
                <div className="">
                    <h1 className={s.home_title}>searching for books</h1>
                </div>
                <div className={s.home_inputbox}>
                    <Input placeholder={'search books'} />
                </div>

                <div className={s.home_select}>
                    <SelectComponent options={serchSelectorCategories} title="Categoties" />
                    <SelectComponent options={sortSelector} title="Sorting by" />
                </div>

            </div >
            <Books />
        </div>
    );
};

export default HomePage;