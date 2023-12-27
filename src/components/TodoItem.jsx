import React, {useState} from 'react';
import styled from "styled-components";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const Card = styled.div`
    display: flex;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    width: 40em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 10px;
    justify-content: space-between;
`
 const CardText = styled.div`
    display: flex;
    align-items: center;
 `
const CardInput = styled.input`
  width : 35em;
`
const Actions = styled.div`
    display: flex;
`

const TodoItem = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [todoText, setTodoText] = useState(props.value.todo);

    function updateValue(event) {
        event.preventDefault();
        setTodoText(event.target.value);
    }
    function editText() {
        if (todoText) {
            setEditMode(!editMode);
            if (editMode) props.editItem(props.value.id, todoText);
        }
    }

    return (
        <Card>
            <CardText>
                <input type='checkbox' checked={props.value.completed === true} onClick={() => props.toggleCompleted(props.value.id)}/>
                {editMode &&
                    <CardInput type='text' value={todoText} onChange={updateValue}></CardInput>
                }
                {!editMode &&
                    <label style={props.value.completed ? {textDecoration: 'line-through'} : {}}>{todoText}</label>
                }
            </CardText>
            <Actions>
                <Button type='default' onClick={editText}>{!editMode ? 'Edit' : 'Done'}</Button>
                <Button onClick={() => props.deleteItem(props.value.id)}><DeleteOutlined /></Button>
            </Actions>
        </Card>
    );
};

export default TodoItem;
