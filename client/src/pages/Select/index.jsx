import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Header from './components/header'
import Create from './components/create-task'
import Tasks from './components/tasks'
import axios from 'axios'
import Deleteall from './components/delete-all'

import ModalAlert from '../../components/Modal/modal'

import './styles/App.css'

export default class App extends Component {
  state = {
    tasks: [],
    selectedTask: undefined
  }
  componentDidMount () {
    axios.get('http://localhost:3000/api/todos/')
        .then((res) => {
          this.setState({tasks: res.data});
        })
        .catch((error) => console.error('axios error', error));
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //     if(prevState.tasks.length !== this.state.tasks.length) {
  //         const json = JSON.stringify(this.state.tasks)
  //         localStorage.setItem('tasks', json)
  //     }
  // }

  deleteTask = (taskTodelete) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskTodelete !== task)
    }))
  }


  deleteAll = () => {
    this.setState(() => ({tasks: []}))
  }

  closeModal = () => {
    this.setState(() => ({selectedTask: undefined}))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const singletask = event.target.elements.singletask.value.trim().toLowerCase()
    if(!singletask) {
        this.setState(() => ({selectedTask: 'Please enter a character!'}))
    } else if(this.state.tasks.indexOf(singletask) > -1) {
        this.setState(() => ({selectedTask: 'This character already exists!'}))
    } else this.setState((prevState) => ({ tasks: [...prevState.tasks, singletask] }))
    event.target.elements.singletask.value = ''
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <Header />
          <Create
            onSubmit={this.onSubmit}
          />

          {this.state.tasks.length > 0 ?

            <Tasks
              tasks={this.state.tasks}
              deleteTask={this.deleteTask}
            />
            : null
          }
          {this.state.tasks.length > 0 ?
            <Deleteall
              deleteAll={this.deleteAll}
            />
            : null
          }
          <ModalAlert
            selectedTask={this.state.selectedTask}
            closeModal={this.closeModal}
          />

        </div>
      )
    }
  }
}

