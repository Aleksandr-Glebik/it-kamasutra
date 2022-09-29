import React, { useState } from "react"
import { Button } from "antd"
import DrawerRules from './DrawerRules.tsx'
import PersonCard from './PersonCard.tsx'
import GameTimer from './GameTimer.tsx'
import styles from './GamePage.module.css'

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

    let [setupSectionForm, setSetupSectionForm] = useState(false)
    let [setupSectionButton, setSetupSectionButton] = useState(false)

    let [counter, setCounter] = useState({
        c1: 0,
        c2: 0
    })

    return (
        <div className={styles.container}>
            <div className={styles.gameSection}>
                <PersonCard cardTitle={'str1'} imageSrc={initialImageSrc} count={counter.c1} />
                <GameTimer className={styles.gameTimer}/>
                <PersonCard cardTitle={'str2'} imageSrc={initialImageSrc} count={counter.c2} />
            </div>
            <div className={styles.setupSection}>
                <div className={styles.setupSectionNav}>
                    <Button danger
                            onClick={() => setSetupSectionForm(prev => !prev)}
                    >Настройка</Button>
                    <Button type="default"
                            onClick={() => setSetupSectionButton(prev => !prev)}
                    >Играть</Button>
                    <DrawerRules />
                </div>
                {setupSectionForm &&  <div className={styles.setupSectionForm}>
                    Секция где будут импуты для установки имен и фото
                </div>}
                {setupSectionButton && <div className={styles.setupSectionButton}>
                    <div>
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
                </div>}
            </div>
        </div>
    )
}

export default GamePage