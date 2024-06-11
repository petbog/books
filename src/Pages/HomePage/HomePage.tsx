import { useEffect, useState } from 'react';
import { FC } from 'react';
import s from './HomePage.module.scss'
import { Input } from '../../ui/Input/Input';
import SelectComponent from '../../ui/Select/SelectComponent';
import { RootState, useAppDispatch } from '../../Redux';
import Books from '../../Component/Books/Books';
import {  featchBooks } from '../../Redux/Slices/BooksSlice';
import { useSelector } from 'react-redux';
import { Button } from '../../ui/Button/Button';



const HomePage: FC = () => {
    const dispatch = useAppDispatch()
    const [scrollImg, setScrollImg] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [clickValue, setClickValue] = useState<boolean>(false)
    const { categories, sort, item } = useSelector((state: RootState) => state.books)
    const { items } = useSelector((state: RootState) => state.books.item)
    const [clickButton, setClickButton] = useState<boolean>(false)


    const handlImg = () => {
        setScrollImg(!scrollImg)
    }
    useEffect(() => {
        if (clickValue) {
            dispatch(featchBooks({
                value,
                categories,
                sort,
            }));
            setClickValue(false);
        }
    }, [dispatch, value, categories, sort, clickValue]);




    const serchSelectorCategories = [
        { activ: "all", label: "all" },
        { label: "art" },
        { label: "biography" },
        { label: "computers" },
        { label: "history" },
        { label: "medical" },
        { label: "poetry" },
    ]
    const sortSelector = [
        { activ: "relevance", label: "relevance" },
        { label: "newest" },
    ]

    return (
        <div className="">
            <div className={items.length ? `${s.home}  ${s.imgMin}` : `${s.home} `} >
                <button onClick={handlImg}>button</button>
                <div className="">
                    <h1 className={s.home_title}>searching for books</h1>
                </div>
                <div className={s.home_inputbox}>
                    <Input setValue={setValue} value={value} setClickValue={setClickValue} clickValue={clickValue} placeholder={'search books'} />
                </div>

                <div className={s.home_select}>
                    <SelectComponent options={serchSelectorCategories} title="Categoties" />
                    <SelectComponent options={sortSelector} title="Sorting by" />
                </div>
            </div >
            {item.totalItems > 1 &&
                <div className={s.totalBooks}>
                    <div className={s.totalBooks_item}>Found {item.totalItems} result </div>
                </div>
            }
            <Books />
            {item.totalItems > 1 &&
                <div className={s.button}>
                    <Button clickButton={clickButton} setClickButton={setClickButton} text={'Load more'} />
                </div>
            }
        </div>
    );
};

export default HomePage;