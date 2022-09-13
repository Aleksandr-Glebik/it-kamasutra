import React, {useState, useEffect, ChangeEvent} from 'react'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
                <div>
                   <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status || "No statuse"}</span>
                </div>
            }
            { editMode &&
                <div>
                    <input autoFocus onChange={onStatusChange} onBlur={deActivateEditMode}
                    value={status}></input>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;