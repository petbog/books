import React, { FC, useState } from "react"
import s from './SelectComponent.module.scss'
import Select from 'react-select'

const options = [
    { value: 'классика', label: "klassik" },
    { value: 'роман', label: "roman" },
]

type SelectComponentType = {
    title: string
}


const SelectComponent: FC<SelectComponentType> = ({ title }) => {

    const [optionSelect, setOptionSelect] = useState<{ label: string, value: string } | null>(null)

    const handleChenge = (selectedOption: { label: string, value: string } | null) => {
        setOptionSelect(selectedOption);
    }

    return (
        <div className={s.select}>
            <h6 className={s.select_title}>{title}</h6>
            <Select
                className={s.select_item}
                options={options}
                value={optionSelect}
                onChange={handleChenge}
            />
        </div>
    )
}

export default SelectComponent