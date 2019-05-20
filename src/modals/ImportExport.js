import React, {Component} from 'react'
import {store} from '../store'

import { copyToClipboard } from "../functions";

export default class ImportExportModal extends Component{
    constructor(props){
        super(props)

        this.state={
            copied: false
        }
    }

    handleClick(e){
        e.preventDefault()

        if(e.target.classList.contains('modal')) {
            this.props.toggleModal('exportModal')

            this.setState({
                copied: false
            })

        }

    }

    handleCopy(){
        // this.textArea.select()
        copyToClipboard(this.textArea.value)
        this.setState({
            copied: true
        })
    }

    handleChange(e){

        this.setState({
            project: e.target.value
        })

    }

    handleImport(){
        store.dispatch({type: 'IMPORT_PROJECT', payload : JSON.parse(this.state.project)})
    }

    componentWillReceiveProps(props){
        if(props.state.project){
            this.setState({
                project: JSON.stringify(props.state.project)
            })
        }else {
            this.setState({
                project: 'Paste JSON here'
            })
        }

    }


    render(){

        return(
            <div className={`modal ${this.props.visible ? 'js-active' : ''}`} onClick={this.handleClick.bind(this)}>
                <div className="inner abs middle">
                    <h2>{this.props.state.import ? 'Import' : 'Export'}</h2>
                    <textarea value={this.state.project} onChange={this.handleChange.bind(this)} ref={(textArea)=>{this.textArea = textArea}}/>

                    {this.props.state.export &&
                    <button onClick={this.handleCopy.bind(this)}>{this.state.copied ? 'Copied' : 'Copy'}</button>}

                    {this.props.state.import &&
                    <button onClick={this.handleImport.bind(this)}>Import</button>}
                </div>
            </div>
        )
    }
}