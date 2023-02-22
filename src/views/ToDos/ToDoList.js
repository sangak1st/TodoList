import React, { Component } from 'react';
import AddToDoList from './AddToDoList';
import './ToDoList.scss';
import { toast } from 'react-toastify';


export default class ToDoList extends Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Code' },
            { id: 'todo2', title: 'Fix bug' }
        ]
    }

    addNewTodo = (todo) => {
        // let currenListTodo = this.state.listTodos;
        // currenListTodo.push(todo)
        this.setState({
            listTodos: [...this.state.listTodos, todo],
            // listTodos: currenListTodo
        })

        toast.success("Add success!")

    }

    render() {
        let { listTodos } = this.state // let listTodos = this.state.listTodos


        return (
            <div className='todolist'>
                <div className='list-todo-container'>
                    <div className='list-todo-content'>
                        <AddToDoList
                            addNewTodo={this.addNewTodo}
                        />
                        {listTodos && listTodos.length > 0 &&
                            listTodos.map((item, index) => {
                                return (
                                    <div className='todo-child' key={item.id}>
                                        <span>{index + 1} - {item.title}</span>
                                        <button className='button'>Edit</button>
                                        <button className='button'>Delete</button>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}
