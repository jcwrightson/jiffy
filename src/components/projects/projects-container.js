import React, {Component} from 'react'
import { connect } from 'react-redux'
import store from '../../store'

import Project from '../project/project'
import './projects-container.css'


import ProjectModal from '../modals/project_modal'
import ImportExportModal from '../modals/import-export'


@connect((store)=>{
    return {
        projects : store.projects
    }
})
export default class ProjectsContainer extends Component {

    constructor(props){
        super(props)

        this.state = {
            projectModal : false,
            exportModal : false,

            modals:{
                exportModal:{
                    state:{}
                }
            }
        }
    }

    handleAdd(){

        this.toggleModal('projectModal')
    }

    handleImport(){
        this.toggleModal('exportModal', {import: true})
    }

    toggleModal(modal, state){
        this.setState({
            [modal] : !this.state[modal]
        })

        if(state){
            this.setState({
                modals: {
                    [modal] : {
                        state: state
                    }
                }
            })
        }
    }

    remove(id){
        store.dispatch({type:'REMOVE_PROJECT', payload: id})
    }


    render() {

        const { projects } = this.props

        return (
                <div>
                <section className="header">
                    <ProjectModal visible={this.state.projectModal} toggleModal={this.toggleModal.bind(this)}/>
                    <ImportExportModal visible={this.state.exportModal} toggleModal={this.toggleModal.bind(this)} state={this.state.modals.exportModal.state}/>

                    <div className="container-fluid">
                        <div className="flex row justify-between align-center">
                        <h2>Time Tracking</h2>

                            <div className="top-nav flex row justify-end">
                                <button className="" onClick={()=>{this.handleImport()}}>Import</button>
                                <button className="add" onClick={()=>{this.handleAdd()}}>New</button>
                            </div>

                        </div>

                    </div>
                </section>

                <section className="projects">
                    <div className="container-fluid">
                    <div className="projects-container">

                        {projects.map((project, i) => {
                            return <Project key={i} project={project} toggleModal={this.toggleModal.bind(this)} remove={this.remove}/>
                        })}
                        </div>
                    </div>
                </section>
                </div>


        )
    }
}