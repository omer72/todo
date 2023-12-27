import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import {Button} from "antd";

const AddTodoSection = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  width: 40em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 10px;
  justify-content: space-between;
`
const TodoList = () => {

    const [todoList, setTodoList] = useState([]);
    const newTodoTitle = useRef(null);
    useEffect(() => {
        axios.get('https://dummyjson.com/todos').then((response) => {
            if (response.data && response.data.todos) {
                setTodoList(response.data.todos)
            }
        })
    }, []);

    const deleteItem = (itemId) =>{
        const filterList = todoList.filter(todoItem => todoItem.id !== itemId);
        setTodoList(filterList);
    }
    const editItem = (itemId, todoText)=> {
        setTodoList(todoList.map(todoItem => {
            if (todoItem.id === itemId) {
                return {...todoList, todo: todoText};
            } else {
                return todoItem;
            }
        }));
    }

    const toggleCompleted = (id) =>{
        const list = todoList.map(todoItem => {
            if (todoItem.id === id) {
                todoItem.completed =  !todoItem.completed;
            }
            return todoItem;
        })
        setTodoList(list);
    }

    const addTodoItem = () => {
        if (newTodoTitle.current.value ) {
            const newToDoItem = {
                id: Math.floor(Math.random() * 1000),
                todo: newTodoTitle.current.value,
                completed: false
            };
            setTodoList([newToDoItem, ...todoList]);
            newTodoTitle.current.value = '';
        }
    }

    return (
        <>
            <AddTodoSection>
                <input type='text' ref={newTodoTitle} style={{width : '35em'}}/>
                <Button type="primary" onClick={addTodoItem} >Add</Button>
            </AddTodoSection>

            {todoList.map((todo) =><TodoItem
                key={todo.id}
                value={todo}
                deleteItem={deleteItem}
                toggleCompleted={toggleCompleted}
                editItem = {editItem}
            />)}
        </>
    );
};

export default TodoList;
