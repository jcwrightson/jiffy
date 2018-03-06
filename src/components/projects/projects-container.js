import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from '../../store'

import Project from '../project/project'
import './projects-container.css'


import ProjectModal from '../project/project_modal'


@connect((store)=>{
    return {
        projects : store.projects
    }
})
export default class ProjectsContainer extends Component {

    constructor(props){
        super(props)

        this.state = {
            modal: false
        }
    }

    handleAdd(){

        this.toggleModal()
    }

    toggleModal(){
        this.setState({
            modal : !this.state.modal
        })
    }

    remove(id){
        store.dispatch({type:'REMOVE_PROJECT', payload: id})
    }


    render() {

        const { projects } = this.props

        return (
                <div>
                <section className="header">
                    <ProjectModal visible={this.state.modal} toggleModal={this.toggleModal.bind(this)}/>
                    <div className="container-fluid">
                        <h2>Time Tracking</h2>

                        <div className="abs middle right">
                            <button className="add" onClick={()=>{this.handleAdd()}}>New</button>
                        </div>


                    </div>
                </section>

                <section className="projects">
                    <div className="container-fluid">
                    <div className="projects-container">

                        {projects.map((project, i) => {
                            return <Project key={i} project={project} remove={this.remove}/>
                        })}
                        </div>
                    </div>
                </section>
                </div>


        )
    }
}