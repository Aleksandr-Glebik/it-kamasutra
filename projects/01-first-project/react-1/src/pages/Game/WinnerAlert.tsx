import React from "react"
import { Alert, Space } from 'antd'

interface CounterType {
    c1: number
    c2: number
}

interface GamersType {
    nameOne: string
    nameTwo: string
}

type WinnerAlertPropsType = {
    counter: CounterType
    gamers: GamersType
}

type typeAlert = 'success' | 'info'

const WinnerAlert: React.FC<WinnerAlertPropsType> = (props: WinnerAlertPropsType) => {

    let message: string
    let descriptionMessage: string
    let typeAlert: typeAlert

    if (props.counter.c1 > props.counter.c2) {
        message = `${props.gamers.nameOne} Победитель!!!`
        descriptionMessage = `Правильных ответов ${props.counter.c1.toString()} ( Разница в баллах: ${(props.counter.c1 - props.counter.c2).toString()} )`
        typeAlert = 'success'
    } else if (props.counter.c1 < props.counter.c2) {
        message = `${props.gamers.nameTwo} Победитель!!!`
        descriptionMessage = `Правильных ответов ${props.counter.c1.toString()} ( Разница в баллах: ${(props.counter.c2 - props.counter.c1).toString()} )`
        typeAlert = 'success'
    } else if (props.counter.c1 === props.counter.c2) {
        message = `НИЧЬЯ`
        descriptionMessage = 'Правильных ответов ' + props.counter.c1.toString()
        typeAlert = 'info'
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                    message={message}
                    description={descriptionMessage}
                    type={typeAlert}
                    showIcon
                />
        </Space>
    )
}

export default WinnerAlert