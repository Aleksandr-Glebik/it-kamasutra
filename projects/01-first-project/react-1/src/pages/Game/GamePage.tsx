import React, { useState } from "react"
import { Button, Card } from "antd"
import DrawerRules from './DrawerRules.tsx'
import PersonCard from './PersonCard.tsx'
import GameTimer from './GameTimer.tsx'
import CastomFormCard from './CastomFormCard.tsx'
import styles from './GamePage.module.css'
import {PlusCircleOutlined, MinusCircleOutlined, PlayCircleOutlined, PauseCircleOutlined, MinusOutlined, RedoOutlined } from '@ant-design/icons'

const GamePage: React.FC = () => {
    return (
        <div>
            <Game />
        </div>
    )
}

const initialImageSrc = 'https://source.unsplash.com/user/jakehills/z0gDv24X3uQ/1920x1280'
const imageSrcMan = 'https://source.unsplash.com/user/timbog80/4uojMEdcwI8/1920x1280'
const imageSrcWoman = 'https://source.unsplash.com/user/denysnevozhai/z0nVqfrOqWA/1920x1280'

const Game: React.FC = () => {
    let [setupSectionForm, setSetupSectionForm] = useState(false)
    let [setupSectionButton, setSetupSectionButton] = useState(false)

    let [nameOne, setNameOne] = useState('Имя 1 игрока')
    let [nameTwo, setNameTwo] = useState('Имя 2 игрока')

    let [genderOne, setGenderOne] = useState('')
    let [genderTwo, setGenderTwo] = useState('')

    let [imageSrcOne, setImageSrcOne] = useState(initialImageSrc)
    let [imageSrcTwo, setImageSrcTwo] = useState(initialImageSrc)

    function handleSubmitOne({name, gender}) {
        setNameOne(name)
        setGenderOne(gender)
        if (gender === 'man') {
            setImageSrcOne(imageSrcMan)
        } else if (gender === 'woman') {
            setImageSrcOne(imageSrcWoman)
        } else {
            setImageSrcOne(initialImageSrc)
        }
    }

    function handleSubmitTwo({name, gender}) {
        setNameTwo(name)
        setGenderTwo(gender)
        if (gender === 'man') {
            setImageSrcTwo(imageSrcMan)
        } else if (gender === 'woman') {
            setImageSrcTwo(imageSrcWoman)
        } else {
            setImageSrcTwo(initialImageSrc)
        }
    }


    let [counter, setCounter] = useState({
        c1: 0,
        c2: 0
    })

    const [time, setTime] = useState({
        minutes: 5,
        seconds: 0
    })

    const [play, setPlay] = useState(false)

    const resetCountAndTime = () => {
        setTime({
            minutes: 5,
            seconds: 0
        })
        setCounter(actual => {
            return {
                ...actual,
                c1: 0,
                c2: 0
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.gameSection}>
                <PersonCard cardTitle={nameOne} imageSrc={imageSrcOne} count={counter.c1} gender={genderOne}/>
                <GameTimer
                  className={styles.gameTimer}
                  time={time}
                  onChangeTime={setTime}
                  play={play}
                />
                <PersonCard cardTitle={nameTwo} imageSrc={imageSrcTwo} count={counter.c2} gender={genderTwo}/>
            </div>
            <div className={styles.setupSection}>
                <div className={styles.setupSectionNav}>
                    <Button type="primary"
                            onClick={() => setSetupSectionForm(prev => !prev)}
                    >Настройка</Button>
                    <Button type="default"
                            onClick={() => setSetupSectionButton(prev => !prev)}
                    >Играть</Button>
                    <DrawerRules />
                </div>
                {setupSectionForm &&  <div className={styles.setupSectionForm}>
                    <CastomFormCard cardTitle={'Данные Первого игрока'} name={nameOne} onSubmit={handleSubmitOne} gender={genderOne} />
                    <CastomFormCard cardTitle={'Данные Второго игрока'} name={nameTwo} onSubmit={handleSubmitTwo} gender={genderTwo} />
                </div>}
                {setupSectionButton && <div className={styles.setupSectionButton}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div className="site-card-border-less-wrapper">
                            <Card title="Первый Игрок" bordered={false} style={{ width: 300 }}>
                                <Button type="primary" onClick={ () => setCounter(actual => {
                                return {
                                    ...actual, c1: actual.c1 + 1
                                }
                                })}>
                                    <PlusCircleOutlined style={{fontSize: '20px'}} />
                                </Button>
                                <Button danger style={{marginLeft: '20px'}}
                                  onClick={ () => setCounter(actual => {
                                return {
                                    ...actual, c1: actual.c1 - 1
                                }
                                })}>
                                    <MinusCircleOutlined style={{fontSize: '20px'}} />
                                </Button>
                            </Card>
                            </div>
                            <div className="site-card-border-less-wrapper">
                                <Card title="Второй Игрок" bordered={false} style={{ width: 300 }}>
                                    <Button type="primary" onClick={ () => setCounter(actual => {
                                        return {
                                            ...actual, c2: actual.c2 + 1
                                        }
                                    })}>
                                        <PlusCircleOutlined style={{fontSize: '20px'}} />
                                    </Button>
                                    <Button danger style={{marginLeft: '20px'}}
                                     onClick={ () => setCounter(actual => {
                                        return {
                                            ...actual, c2: actual.c2 - 1
                                        }
                                    })}>
                                        <MinusCircleOutlined style={{fontSize: '20px'}} />
                                    </Button>
                                </Card>
                            </div>
                        </div>
                        <div style={{justifySelf: 'flex-end', alignSelf: 'center', padding: 20}}>
                            <Card title="Управление игрой" bordered={false} style={{ width: 300 }}>
                                <div style={{ display:'flex', justifyContent: 'space-between'}}>
                                    <p style={{ display:'inline-block' }}>Начать игру</p>
                                    <Button
                                    onClick={() => setPlay(true)}
                                    >
                                    <PlayCircleOutlined style={{fontSize: '20px'}} />
                                    </Button>
                                </div>
                                <div style={{ display:'flex', justifyContent: 'space-between'}}>
                                    <p style={{ display:'inline-block' }}>Пауза</p>
                                    <Button
                                        onClick={() => setPlay(false)}
                                    >
                                        <PauseCircleOutlined style={{fontSize: '20px'}} />
                                    </Button>
                                </div>
                                <div style={{ display:'flex', justifyContent: 'space-between'}}>
                                <p style={{ display:'inline-block' }}>Штрафной балл каждому</p>
                                <Button onClick={ () => setCounter(actual => {
                                return {
                                    ...actual,
                                    c1: actual.c1 - 1,
                                    c2: actual.c2 - 1
                                }
                                })}>
                                    <MinusOutlined style={{fontSize: '20px'}} />
                                </Button>
                                </div>
                                <div style={{ display:'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <Button onClick={ () => resetCountAndTime()}>
                                    <RedoOutlined style={{fontSize: '20px'}} />
                                </Button>
                                <p style={{ display:'inline-block' }}>Начать игру заново</p>
                                </div>
                            </Card>
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