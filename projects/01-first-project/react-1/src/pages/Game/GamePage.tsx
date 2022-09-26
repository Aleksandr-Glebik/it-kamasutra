import { Button } from "antd"
import React, { useState } from "react"

const GamePage: React.FC = () => {
    return (
        <div>
            <Game />
        </div>
    )
}

const Game: React.FC = () => {
    console.log('component rendering');

    let [player1Counter, setPlayer1Counter] = useState(0)
    let [player2Counter, setPlayer2Counter] = useState(0)

    return (
        <div>
            <div>
                <div>Иван Иванович</div>
                <div>{player1Counter}</div>
                <Button onClick={() => setPlayer1Counter(prev => prev + 1)}>+</Button>
            </div>
            <hr />
            <div>
                <div>Петр Петрович</div>
                <div>{player2Counter}</div>
                <Button onClick={() => setPlayer2Counter(prev => prev + 1)}>+</Button>
            </div>
            <hr />
            <Button onClick={() => {
                setPlayer1Counter(prev => prev - 1)
                setPlayer2Counter(prev => prev - 1)
            }}>-</Button>
            <Button onClick={() => {
                setPlayer1Counter(0)
                setPlayer2Counter(0)
            }}>reset game</Button>
        </div>
    )
}

export default GamePage