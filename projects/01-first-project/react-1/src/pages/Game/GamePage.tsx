import React, { useState } from "react"
import { Button } from "antd"
import DrawerRules from './DrawerRules.tsx'
import PersonCard from './PersonCard.tsx'
import GameTimer from './GameTimer.tsx'
import CastomFormCard from './CastomFormCard.tsx'
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

    let [nameOne, setNameOne] = useState('Name 1')
    let [nameTwo, setNameTwo] = useState('Name 2')


    let [counter, setCounter] = useState({
        c1: 0,
        c2: 0
    })

    return (
        <div className={styles.container}>
            <div className={styles.gameSection}>
                <PersonCard cardTitle={nameOne} imageSrc={initialImageSrc} count={counter.c1} />
                <GameTimer className={styles.gameTimer}/>
                <PersonCard cardTitle={nameTwo} imageSrc={initialImageSrc} count={counter.c2} />
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
                    <CastomFormCard cardTitle={'Данные Первого игрока'} name={nameOne} onSubmit={setNameOne} />
                    <CastomFormCard cardTitle={'Данные Второго игрока'} name={nameTwo} onSubmit={setNameTwo} />
                </div>}
                {setupSectionButton && <div className={styles.setupSectionButton}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{border: '1px solid black', padding: 20}}>
                                <p>Управление очками Первого Игрока</p>
                                <Button onClick={ () => setCounter(actual => {
                                return {
                                    ...actual, c1: actual.c1 + 1
                                }
                                })}>+ очко 1 игроку</Button>
                                <Button onClick={ () => setCounter(actual => {
                                return {
                                    ...actual, c1: actual.c1 - 1
                                }
                                })}>- очко 1 игроку</Button>
                            </div>
                            <div style={{border: '1px solid black', padding: 20}}>
                                <p>Управление очками Второго Игрока</p>
                                <Button onClick={ () => setCounter(actual => {
                                    return {
                                        ...actual, c2: actual.c2 + 1
                                    }
                                })}>+ очко 2 игроку</Button>
                                <Button onClick={ () => setCounter(actual => {
                                    return {
                                        ...actual, c2: actual.c2 - 1
                                    }
                                })}>- очко 2 игроку</Button>
                            </div>
                        </div>
                        <div style={{justifySelf: 'flex-end',     alignSelf: 'center', padding: 20}}>
                            <Button>Старт</Button>
                            <Button>Остановить время</Button>
                            <Button onClick={ () => setCounter(actual => {
                                return {
                                    ...actual,
                                    c1: actual.c1 - 1,
                                    c2: actual.c2 - 1
                                }
                            })}>- штрафное очко всем игрокам</Button>
                            <Button onClick={ () => setCounter(actual => {
                                    return {
                                        ...actual,
                                        c1: 0,
                                        c2: 0
                                    }
                            })}>сбросить счет</Button>

                        </div>
                    </div>
                    <div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default GamePage