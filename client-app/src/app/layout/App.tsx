import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Container } from 'semantic-ui-react';
import { Activity } from '../models/activities';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  const [activities,setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode,setEditMode] = useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  },[])

  function handlerSelectActivity(id:string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handlerCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handlerFormOpen(id?: string) {
    id ? handlerSelectActivity(id) : handlerCancelSelectActivity();
    setEditMode(true);
  }
  function handlerFormClose() {
    setEditMode(false);
  }
  function handlerCreateOrEditActivity(activity:Activity) {
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
      : setActivities([...activities,{...activity,id:uuid()}])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  function handlerDeleteActivity(id:string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handlerFormOpen}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handlerSelectActivity}
            cancelSelectActivity={handlerCancelSelectActivity}
            editMode={editMode}
            openForm={handlerFormOpen}
            closeForm={handlerFormClose}
            createOrEdit={handlerCreateOrEditActivity}
            deleteActivity={handlerDeleteActivity}
          />
        </Container>
    </Fragment>
  );
}

export default App;
