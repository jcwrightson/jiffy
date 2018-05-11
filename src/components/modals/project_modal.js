import React, { Component } from 'react'
import store from "../../store";
import '../project/project-modal.css'

export default class ProjectModal extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: 'Project',
            visible: true
        }
    }

    handleChange(e){
        this.setState({
            title: e.target.value
        })
    }

    handleCreate(e){

        if(this.state.title) {
            store.dispatch({type: 'NEW_PROJECT', payload: this.state})

            this.props.toggleModal('projectModal')


            this.setState({
                title: 'Project'
            })
        }
    }

    handleKeyPress(e){
        if(e.which === 13 && this.state.title){
            this.handleCreate(e)
        }
    }

    handleClick(e){
        e.preventDefault()

        if(e.target.classList.contains('modal')){
            this.props.toggleModal('projectModal')
        }

    }



    render(){
        return(
            <div className={`modal ${this.props.visible ? 'js-active' : ''}`} onClick={this.handleClick.bind(this)}>
                <div className="inner abs middle">
                    <h2>New Project</h2>
                    <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)} onFocus={(e)=>{if (e){e.target.select()}}} onKeyDown={this.handleKeyPress.bind(this)}/>
                    <button onClick={this.handleCreate.bind(this)}>Create</button>
                </div>
            </div>
        )
    }
}