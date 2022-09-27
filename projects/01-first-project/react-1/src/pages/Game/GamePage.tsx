import { Button, Card, Image } from "antd"
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
        <div style={{width: 900, display: 'flex', justifyContent: 'space-between'}}>
            <Card title={'Иван Иванович'}
                  hoverable
                  style={{ width: 250 }}
                  cover={
                  <Image alt="photo"
                       style={{ width: 250 }}
                       src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                  }
            >
                <h2>Счет: {counter.c1}</h2>
                <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual, c1: actual.c1 + 1
                    }
                })}>+</Button>
            </Card>
            <Card title={'Петр Петрович'}
                  hoverable
                  style={{ width: 250 }}
                  cover={
                  <Image alt="photo"
                       style={{ width: 250 }}
                       src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                  }
            >
                <h2>Счет: {counter.c2}</h2>
                <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual, c2: actual.c2 + 1
                    }
                })}>+</Button>
            </Card>
            <div>
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
        </div>
    )
}

export default GamePage