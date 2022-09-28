import { Button } from "antd"
import React, { useState } from "react"
import DrawerRules from './DrawerRules.tsx'
import PersonCard from './PersonCard.tsx'

const GamePage: React.FC = () => {
    return (
        <div>
            <Game />
        </div>
    )
}

const initialImageSrc = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'

const Game: React.FC = () => {
    console.log('component rendering');

    let [counter, setCounter] = useState({
        c1: 0,
        c2: 0
    })

    return (
        <div style={{width: 900, display: 'flex', justifyContent: 'space-between'}}>
            {/* <Card title={'Иван Иванович'}
                  hoverable
                  style={{ width: 250 }}
                  cover={
                  <Image alt="photo"
                       style={{ width: 250 }}
                       src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                  }
            >
                <h2>Счет: {counter.c1}</h2>
            </Card> */}
            <PersonCard cardTitle={'str1'} imageSrc={initialImageSrc} count={counter.c1} />
            <PersonCard cardTitle={'str2'} imageSrc={initialImageSrc} count={counter.c2} />
            {/* <Card title={'Петр Петрович'}
                  hoverable
                  style={{ width: 250 }}
                  cover={
                  <Image alt="photo"
                       style={{ width: 250 }}
                       src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                  }
            >
                <h2>Счет: {counter.c2}</h2>
            </Card> */}
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
                <DrawerRules />
                <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual, c1: actual.c1 + 1
                    }
                })}>+ очко 1 игроку</Button>
                <Button onClick={ () => setCounter(actual => {
                    return {
                        ...actual, c2: actual.c2 + 1
                    }
                })}>+ очко 2 игроку</Button>
            </div>
        </div>
    )
}

export default GamePage