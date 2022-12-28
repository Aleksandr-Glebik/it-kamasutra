import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import StepsRules from './StepsRules.tsx'

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
        <Button type="primary" ghost onClick={showDrawer}>
            Правила игры
        </Button>
        <Drawer title="Правила игры" placement="right" onClose={onClose} open={open}>
            <StepsRules />
        </Drawer>
    </>
    )
}


export default DrawerRules