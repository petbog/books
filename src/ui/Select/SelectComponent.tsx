import { FC, useState } from "react"
import s from './SelectComponent.module.scss'

type optionsType = {
    activ?: string,
    label: string;
}

type SelectComponentType = {
    title: string,
    options: optionsType[]
}

const SelectComponent: FC<SelectComponentType> = ({ title, options }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(options[0]?.label || "");

    const handkeOpen = () => {
        setOpen(prev => !prev);
    }

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setOpen(false);
    }

    return (
        <div className={s.select}>
            <h6 className={s.select_title}>{title}</h6>
            <div className={s.dropWown}>
                <div onClick={handkeOpen} className={s.dropWown_button}>
                    {selectedCategory}
                    {
                    !open ? <span className={s.rows}>▲</span>
                    : <span className={s.rows}>▼</span>
                    }
                </div>
                {
                    open && (
                        <div className={s.dropWown_list}>
                            {
                                options.map((item: optionsType, i) => (
                                    <div key={i} className={s.list} onClick={() => handleSelectCategory(item.label)}>
                                        <h3 className={s.list_item}>{item.label}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SelectComponent;