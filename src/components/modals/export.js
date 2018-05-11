import React, {Component} from 'react'
import store from '../../store'

export default class ExportModal extends Component{
    constructor(props){
        super(props)

        this.state={}
    }

    handleClick(e){
        e.preventDefault()

        if(e.target.classList.contains('modal')){
            this.props.toggleModal('exportModal')
        }

    }

    handleCopy(){

    }

    handleChange(e){
        // console.log(JSON.parse(e.target.value))

        this.setState({
            project: e.target.value
        })

        // console.log(this.refs.textArea.val())
    }

    handleImport(){
        store.dispatch({type: 'IMPORT_PROJECT', payload : JSON.parse(this.state.project)})
    }

    componentWillReceiveProps(props){
        if(props.state.project){
            this.setState({
                project: JSON.stringify(props.state.project)
            })
        }

        console.log(props.state)
    }

    render(){
        return(
            <div className={`modal ${this.props.visible ? 'js-active' : ''}`} onClick={this.handleClick.bind(this)}>
                <div className="inner abs middle">
                    <h2>{this.props.state.import ? 'Import' : 'Export'}</h2>
                    <textarea value={this.state.project} onChange={this.handleChange.bind(this)} ref='textArea'/>

                    {this.props.state.export &&
                    <button onClick={this.handleCopy.bind(this)}>Copy</button>}

                    {this.props.state.import &&
                    <button onClick={this.handleImport.bind(this)}>Import</button>}
                </div>
            </div>
        )
    }
}