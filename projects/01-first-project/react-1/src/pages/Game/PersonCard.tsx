import React from "react"
import { Card, Image, Space } from "antd"
import { ManOutlined, WomanOutlined, LoadingOutlined } from '@ant-design/icons';

type PersonCardPropsType = {
    cardTitle: string
    imageSrc: string
    count: number
    gender: string | null
}

const PersonCard: React.FC<PersonCardPropsType> = (props: PersonCardPropsType) => {
    let icon
    if (!props.gender) {
        icon = <LoadingOutlined />
    } else if (props.gender === 'man') {
        icon = <ManOutlined />
    } else if (props.gender === 'woman') {
        icon = <WomanOutlined />
    }

    return (
        <Card title={props.cardTitle}
                  hoverable
                  style={{ width: 250, height: 320 }}
                  cover={
                    <Image alt="photo"
                       style={{ width: 250 }}
                       src={props.imageSrc}
                    />
                  }
            >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{display: 'inline-block', marginTop: '10px'}}>Счет: {props.count}</h2>
                    <Space style={{fontSize: '20px', padding: '5px'}}>
                        {icon}
                    </Space>
                </div>
        </Card>
    )
}

export default PersonCard