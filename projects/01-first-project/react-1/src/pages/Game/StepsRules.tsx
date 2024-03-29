import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps

const rules = [
    'Устанавливаем имена и гендер игроков.',
    'Старт - таймер начинает отчет.',
    'Ведущий зачитывает вопросы, за верный ответ Игроку зачисляется 1 балл.',
    'Когда игрок отвечает не верно вне своей очереди, у него снимаеться штрафной балл',
    'Игра заканичвается когда истекает время.',
    'Подсчет очков: победил тот Игрок у которого больше очков.',
]

const StepsRules: React.FC = () => (

    <Steps progressDot current={rules.length} direction="vertical">
        {rules.map( (item, index) => {
            return <Step title={`Шаг ${index + 1}`} description={item}/>
        })}
    </Steps>

)

export default StepsRules