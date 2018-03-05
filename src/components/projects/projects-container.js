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

                <section>
                    <ProjectModal visible={this.state.modal} toggleModal={this.toggleModal.bind(this)}/>
                    <div className="container-fluid">
                        <h1>My Projects</h1>

                        <button onClick={()=>{this.handleAdd()}}>Add +</button>

                        <div className="projects-container">
                            {projects.map((project, i) => {
                                return <Project key={i} project={project} remove={this.remove}/>
                            })}
                        </div>
                    </div>
                </section>


        )
    }
}