import React from 'react'
// import styles from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
        // this.state.editMode = true
        // this.forceUpdate()
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState)  {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }

        // console.log('update component')
    }

    render() {
        // console.log('render')
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "No statuse"}</span>
                    </div>
                 }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.deActivateEditMode} value={this.state.status}></input>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;