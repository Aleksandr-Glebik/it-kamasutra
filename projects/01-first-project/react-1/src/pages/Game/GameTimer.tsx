import React, {useEffect, useState} from "react"
import { Space, TimePicker } from 'antd'
import moment from 'moment'

export interface TimeType {
    minutes: number;
    seconds: number;
}

export type GameTimerPropsType = {
    time: TimeType
    play: boolean
    onChangeTime: (time: TimeType) => void
    onChangePlay: (play: boolean) => void
}

const GameTimer: React.FC<GameTimerPropsType> = (props: GameTimerPropsType) => {

    const [time, setTime] = useState(props.time)

    useEffect( () => {
        const intervalId = setInterval( () => {
            if (props.play) {
                if (time.seconds === 0 && time.minutes > 0) {
                    setTime({
                        minutes: time.minutes - 1,
                        seconds: time.seconds = 59
                    })
                } else if (time.seconds >= 1) {
                    setTime({
                        minutes: time.minutes,
                        seconds: time.seconds - 1
                    })
                } else if (time.minutes === 0 && time.seconds === 0) {
                    setTime({
                        minutes: 0,
                        seconds: 0
                    })
                }
            }
        }, 1000)


        return () => {
            clearInterval(intervalId)
        }
    })

    useEffect( () => {
        setTime(props.time)
    }, [props.time])

    return (
        <Space direction="vertical">
            <TimePicker value={moment(`${time.minutes}:${time.seconds}`, 'mm:ss')}
                        disabled
                        size="large"
            />
        </Space>
    )
}

export default GameTimer