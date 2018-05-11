export function projects(state=[], action){
    switch(action.type){
        case 'NEW_PROJECT' : {
            // const stateCopy = [...state]
            console.log(action.payload)

            return [{
                created: Date.now(),
                title: action.payload.title,
                running: false,
                time: 0,
                fullWidth: false,
                trackers : [
                    {
                        created: Date.now(),
                        running: false,
                        time: 0,
                    }
                ]
            }, ...state]
        }

        case 'IMPORT_PROJECT' : {
            // const stateCopy = [...state]
            console.log(action.payload)

            return [...state, {...action.payload}]
        }

        case 'BOOTSTRAP':{
            console.log('BOOT', action.payload)
            return [...action.payload]
        }

        case 'STOP_ALL':{
            const stateCopy = [...state]

            stateCopy.map(project=>{
                project.trackers.map(tracker => {
                    tracker.running = false
                })
            })

            return stateCopy
        }

        case 'UPDATE_PROJECT' : {
            const stateCopy = [...state]

            stateCopy.map((project, i) => {
                if(project.created === action.payload.created){
                    stateCopy[i] = {...stateCopy[i], ...action.payload.data}
                }
            })
            return [...stateCopy]
        }

        case 'TOGGLE_FULL_WIDTH' : {
            const stateCopy = [...state]

            stateCopy.map(project => {
                if(project.created === action.payload.created){
                    project.fullWidth = !project.fullWidth
                }
            })
            return [...stateCopy]
        }

        case 'REMOVE_PROJECT' : {
            const stateCopy = [...state]

            let filtered = stateCopy.filter((item, i)=>{
                return item.created !== action.payload
            })

            return [...filtered]

        }

        case 'UPDATE_TRACKER' : {
            const stateCopy = [...state]

            stateCopy.map(project => {
                if(project.created === action.payload.project){
                    return project.trackers.map(tracker => {
                        if(tracker.created === action.payload.tracker){
                            tracker.time = tracker.time+action.payload.time
                        }
                    })
                }
            })
            return [...stateCopy]
        }

        case 'RESET_TRACKER' : {
            const stateCopy = [...state]

            stateCopy.map(project => {
                if(project.created === action.payload.project){
                    return project.trackers.map(tracker => {
                        if(tracker.created === action.payload.tracker){
                            tracker.time = 0
                        }
                    })
                }
            })
            return [...stateCopy]
        }

        case 'REMOVE_TRACKER' : {
            const stateCopy = [...state]

            stateCopy.map(project => {
                if(project.created === action.payload.project.created){
                    project.trackers = project.trackers.filter(tracker=>{
                        return tracker.created !== action.payload.tracker.created
                    })
                }
            })


            // console.log(filtered)
            return [...stateCopy]

        }

        case 'TOGGLE_RUNNING': {
            const stateCopy = [...state]

            stateCopy.map(project => {
                if(project.created === action.payload.project){
                    return project.trackers.map(tracker => {
                        if(tracker.created === action.payload.tracker){
                            tracker.running = !tracker.running
                        }
                    })
                }
            })
            return [...stateCopy]
        }

        case 'ADD_TRACKER' : {
            const stateCopy = [...state]

            stateCopy.map(project => {
                if(project.created === action.payload.project){
                    project.trackers.push({
                        created: action.payload.created ? action.payload.created : Date.now(),
                        running: false,
                        time: 0,
                    })
                }
            })
            return [...stateCopy]
        }

        default : {
            return [...state]
        }
    }

}