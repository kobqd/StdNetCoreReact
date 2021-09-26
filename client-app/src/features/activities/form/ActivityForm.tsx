import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity, initActivity } from "../../../app/models/activities";

interface Props {
  activity:Activity|undefined;
  closeForm:() => void;
  createOrEdit:(activity:Activity) => void;
}

export default function ActivityForm({activity:selectedActivity,closeForm,createOrEdit}:Props) {
  const initialState = selectedActivity ?? initActivity
  const [activity,setActivity] = useState<Activity>(initialState)

  function handlerSubmit() {
    createOrEdit(activity)
  }
  function handlerInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    const {name,value} = event.target;
    setActivity({...activity,[name]:value});
  }

  return (
    <Segment clearing>
        <Form onSubmit={handlerSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handlerInputChange}/>
            <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handlerInputChange} />
            <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handlerInputChange}/>
            <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handlerInputChange}/>
            <Form.Input placeholder='City' value={activity.city} name='city' onChange={handlerInputChange} />
            <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handlerInputChange}/>
            <Button floated='right' positive type='submit' content='Submit' />
            <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
        </Form>
    </Segment>
  );
}
