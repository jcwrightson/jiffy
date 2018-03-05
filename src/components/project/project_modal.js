import React, { Component } from 'react'
import store from "../../store";
import './project-modal.css'

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

    handleCreate(){

        if(this.state.title) {
            store.dispatch({type: 'NEW_PROJECT', payload: this.state})

            this.props.toggleModal()


            this.setState({
                title: 'Project'
            })
        }
    }

    handleKeyPress(e){
        if(e.which === 13 && this.state.title){
            this.handleCreate()
        }
    }



    render(){
        return(
            <div className={`modal ${this.props.visible ? 'js-active' : ''}`}>
                <div className="inner abs middle">
                    <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)} onFocus={(e)=>{if (e){e.target.select()}}} onKeyDown={this.handleKeyPress.bind(this)}/>
                    <button onClick={this.handleCreate.bind(this)}>Create</button>
                </div>
            </div>
        )
    }
}