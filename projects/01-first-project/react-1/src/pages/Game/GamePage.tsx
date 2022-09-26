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

    let [counter, setCounter] = useState({
        c1: 0,
        c2: 0
    })

    return (
        <div>
            <div>
                <div>Иван Иванович</div>
                <div>{counter.c1}</div>
                <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual, c1: actual.c1 + 1
                    }
                })}>+</Button>
            </div>
            <hr />
            <div>
                <div>Петр Петрович</div>
                <div>{counter.c2}</div>
                <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual, c2: actual.c2 + 1
                    }
                })}>+</Button>
            </div>
            <hr />
            <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual,
                        c1: actual.c1 - 1,
                        c2: actual.c2 - 1
                    }
                })}>-</Button>
            <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual,
                        c1: 0,
                        c2: 0
                    }
                })}>reset game</Button>
        </div>
    )
}

export default GamePage