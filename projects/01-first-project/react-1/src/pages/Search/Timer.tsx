import React, { useEffect, useState } from "react"
import { Space, TimePicker } from 'antd'
import moment from 'moment'



export type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
}

const Timer = (props: TimerPropsType) => {
    const [seconds, setSeconds] = useState(props.seconds)

    useEffect( () => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])

    useEffect( () => {
        const intervalId = setInterval(() => {
            setSeconds( prev => prev - 1)
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [props.timerKey])

    return (
        <Space direction="vertical">
            <TimePicker value={moment(`00:${seconds}`, 'mm:ss')}
                        disabled
            />
        </Space>
    )
}

export default Timer
