import React from "react"
import { Card, Image } from "antd"

type PersonCardPropsType = {
    cardTitle: string
    imageSrc: string
    count: number
}



const PersonCard: React.FC<PersonCardPropsType> = (props: PersonCardPropsType) => {
    return (
        <Card title={props.cardTitle}
                  hoverable
                  style={{ width: 250 }}
                  cover={
                  <Image alt="photo"
                       style={{ width: 250 }}
                       src={props.imageSrc} />
                  }
            >
            <h2>Счет: {props.count}</h2>
        </Card>
    )
}

export default PersonCard