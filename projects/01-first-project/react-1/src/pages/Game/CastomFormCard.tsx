import React, {useState, useEffect} from 'react'
import { Card, Input, Button, Form, Radio } from 'antd'

type CastomFormCardPropsType = {
    cardTitle: string
    name: string
    gender: string
    onSubmit: (setupValues: {
        name: string,
        gender: string
    }) => void
}

const CastomFormCard: React.FC<CastomFormCardPropsType> = (props: CastomFormCardPropsType) => {
    let [name, setName] = useState('')
    let [gender, setGender] = useState('')

    useEffect( () => {
        setName(props.name)
        setGender(props.gender)
    }, [props.name, props.gender])

    return (
        <div className="site-card-border-less-wrapper">
            <Card title={props.cardTitle} bordered={false} style={{ width: 300 }}>
                <Form>
                    <Form.Item label="Name">
                        <Input placeholder='Введите имя игрока' value={name} onChange={event => setName(event.currentTarget.value) }/>
                    </Form.Item>
                    <Form.Item label="Gender">
                        <Radio.Group value={gender} onChange={event => setGender(event.target.value)}>
                            <Radio value="man"> Man </Radio>
                            <Radio value="woman"> Woman </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Button
                      onClick={() => {
                        props.onSubmit({
                            name: name,
                            gender: gender
                        })
                      }}
                    >Сохранить</Button>
                </Form>
            </Card>
        </div>
    )
}

export default CastomFormCard
