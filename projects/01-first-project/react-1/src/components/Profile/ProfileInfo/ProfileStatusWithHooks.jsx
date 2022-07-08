import React, {useState} from 'react'
// import styles from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
    // let stateWithSetState = useState(false)
    // let editMode = stateWithSetState[0]
    // let setEditMode = stateWithSetState[1]

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "No statuse"}</span>
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