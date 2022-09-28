import React, { useState } from 'react'
import { Button, Drawer } from 'antd';

const DrawerRules: React.FC = () => {
    const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
    setOpen(false);
    };

    return (
    <>
        <Button type="primary" onClick={showDrawer}>
            Правила игры
        </Button>
        <Drawer title="Правила игры" placement="right" onClose={onClose} open={open}>
        <p>1. Устанавливаем имена и фото играков.</p>
        <p>2. Устанавливаем время раунда (5 минут).</p>
        <p>3. Старт - таймер начинает отчет.</p>
        <p>4. Ведущий зачитывает вопросы, за верный ответ Игроку зачисляется 1 балл.</p>
        <p>5. Каждую минуту у игроков сбрасывается по 1 баллу.</p>
        <p>6. Игра заканичвается когда истекает время.</p>
        <p>7. Подсчет очков: победил тот Игрок у которого больше очков.</p>
        </Drawer>
    </>
    )
}


export default DrawerRules