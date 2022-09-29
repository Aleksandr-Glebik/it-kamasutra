import React, {useState, useEffect} from 'react'
import { Card, Input, Button } from 'antd'

type CastomFormCardPropsType = {
    cardTitle: string
    name: string
    onSubmit: (setupName: string) => void
}

const CastomFormCard: React.FC<CastomFormCardPropsType> = (props: CastomFormCardPropsType) => {
    let [name, setName] = useState('')

    useEffect( () => {
        setName(props.name)
    }, [props.name])

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={props.cardTitle} bordered={false} style={{ width: 300 }}>
                <div>
                    <Input placeholder='Введите имя игрока' value={name} onChange={event => setName(event.currentTarget.value) }/>
                    <Button
                      onClick={() => {
                        props.onSubmit(name)
                      }}
                    >Сохранить</Button>
                </div>
            </Card>
        </div>
    )
}

export default CastomFormCard
