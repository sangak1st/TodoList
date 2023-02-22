import React, { Component } from 'react';
import AddToDoList from './AddToDoList';
import './ToDoList.scss';
import { toast } from 'react-toastify';


export default class ToDoList extends Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Code' },
            { id: 'todo3', title: 'Fix bug' }
        ],
        editTodo: {}
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

    handleDelete = (todo) => {
        let currentTodo = this.state.listTodos;
        currentTodo = currentTodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodo
        })
        toast.success("Delete success!")
    }

    handleEdit = (todo) => {
        let { editTodo, listTodos } = this.state;

        let isEmptyObj = Object.keys(editTodo).length === 0;
        //save
        if (!isEmptyObj && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodos];
            let objIndex = listTodosCopy.findIndex((item) => item.id === todo.id)
            listTodosCopy[objIndex].title = editTodo.title
            this.setState({
                listTodos: listTodosCopy,
                editTodo: ''
            });
            toast.success('Save success')
            return;
        }

        this.setState({
            editTodo: todo
        })
    }

    handleEditOnChange = (event) => {
        let editTodoCopy = { ...this.state.editTodo }
        editTodoCopy.title = event.target.value
        this.setState({
            editTodo: editTodoCopy
        })
    }

    render() {
        let { listTodos, editTodo } = this.state // let listTodos = this.state.listTodos
        let isEmptyObj = Object.keys(editTodo).length === 0;

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
                                        {
                                            !isEmptyObj && editTodo.id === item.id ?
                                                <span>
                                                    {index + 1} -
                                                    <input
                                                        type="text"
                                                        value={editTodo.title}
                                                        onChange={(event) => this.handleEditOnChange(event)}
                                                    />
                                                </span>
                                                :
                                                <span>{index + 1} - {item.title}</span>
                                        }
                                        <button
                                            className='button'
                                            onClick={() => this.handleEdit(item)}
                                        >
                                            {!isEmptyObj && editTodo.id === item.id ? 'Save' : 'Edit'
                                            }
                                        </button>
                                        <button
                                            className='button'
                                            onClick={() => this.handleDelete(item)}
                                        >Delete</button>
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
