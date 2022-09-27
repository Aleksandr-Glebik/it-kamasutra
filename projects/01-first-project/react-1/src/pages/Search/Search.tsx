import React, { useEffect, useState } from "react"
import { Button, Input } from 'antd'

export type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}

const Search: React.FC<SearchPropsType> = (props: SearchPropsType) => {
    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return (
        <>
        <Input
            placeholder="Search"
            value={tempSearch}
            onChange={e => setTempSearch(e.currentTarget.value)}
        />
        <Button
            onClick={() => {
                props.onSubmit(tempSearch)
            }}
        >Find</Button>
        </>
    )
}

export default Search