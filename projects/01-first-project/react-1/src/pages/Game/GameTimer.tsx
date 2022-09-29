import React, {useState} from "react"
import { Space, TimePicker } from 'antd'
import moment from 'moment'

export type GameTimerPropsType = {

}

const GameTimer: React.FC<GameTimerPropsType> = (props: GameTimerPropsType) => {
    const [seconds, setSeconds] = useState(59)

    return (
        <Space direction="vertical"
        //  style={{alignSelf: 'center'}}
         >
            <TimePicker value={moment(`00:${seconds}`, 'mm:ss')}
                        disabled
                        size="large"

            />
        </Space>
    )
}

export default GameTimer