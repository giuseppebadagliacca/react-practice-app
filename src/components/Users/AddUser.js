import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from './addUsers.module.css';
import Button from '../UI/Button';
import ErrorModel from '../UI/ErrorModel';

const AddUser = props => {
// eslint-disable-next-line
  const [enteredUserName, setEnteredUsername]=useState('');
// eslint-disable-next-line
  const [enteredAge, setEnteredAge]=useState('');

  const [error, setError] = useState();

  const addUserHandler = event => {
    event.preventDefault();

    if(enteredUserName.trim().length===0 || enteredAge.trim()===0){
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age (no empty values)'
      })
    }else if(+enteredAge < 1){
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (a number greater than 0)'
      })
    }else{
      props.onAddUser(enteredUserName,enteredAge);
    }

    setEnteredUsername('');
    setEnteredAge('');
  }

  const usernameChangeHandler = event => {
    setEnteredUsername(event.target.value);
  }
  const ageChangeHandler = event => {
    setEnteredAge(event.target.value);
  }

  const errorHandler = () =>{
    setError(null);
  }

  return (
    <div>
    {error && <ErrorModel title={error.title} message={error.message} onConfrim={errorHandler} />}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor='username'>Username</label>
        <input value={enteredUserName} id="username" type="text" onChange={usernameChangeHandler}/>

        <label htmlFor='age'>Age (Years)</label>
        <input value={enteredAge} id="age" type="number" onChange={ageChangeHandler}/>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  )
}

export default AddUser