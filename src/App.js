import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Wrap=styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1em;
`

const Primary=styled.div`
    max-width: 650px;
    margin: 0 auto;
    font-family: 'Sen', sans-serif;
`

const Block = styled.div`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid darkgray;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-bottom: 3vh;
  margin-top: 1vh;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: darkgray;
    color: white;
  }
`;

const TextInput = styled.input`
  width: 93%;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const todolist = [
  {
    id: 1,
    content: `This is Google. It's a search engine started by Sergey Brin and Larry Page.
              PageRank is the search algorithm that started it all. Today it's a multibillion 
              dollar company.`,
    isDone: false
  },
  {
    id: 2,
    content: `This is Amazon. It started off as an online bookstore. Amazon is the owner of AWS, 
              the host this tutorial is targeting`,
    isDone: false
  },
  {
    id: 3,
    content: `This is Apple. It's CEO is Tim Cook. Apple manufactures the iPhone and the Mac.`,
    isDone: false
  },
  {
    id: 4,
    content: `This is FaceBook. It was started by Mark Zuckerberg at Harvard. FaceBook is the creator 
              of the framework used to build this website, React.`,
    isDone: false
  },
]

function Todo({ todo, index, markTodo }) {
  return (
    <>
      <button variant="outline-success" onClick={() => markTodo(index)}>
      <Block>
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.content}</span>
      </Block>
      </button>
    </>
  )
}

function App() {

  const [todos, setTodos] = useState(todolist);

  useEffect(() => {
    try {
      setTodos(JSON.parse(window.localStorage.getItem('todos')))
    } catch {
      setTodos(todolist)
    }
  }, []);

  const addTodo = text => {
    const newTodos = [{content: text, isDone: false}, ...todos];
    setTodos(newTodos);
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const keyPress = (e) => {
    if(e.key === 'Enter') {
        addTodo(e.target.value);
      }
  }

  const handleReset = () => {
    setTodos(todolist)
    window.localStorage.setItem('todos', JSON.stringify(todolist));
  }

  return (
      <Wrap>
        <Primary>
          <Block>
            <Button primary onClick={() => handleReset()}>Reset</Button>
            <TextInput type="text" id="one" onKeyPress={(e) => keyPress(e)}/>
          </Block>
          {todos.map((todo, index) => (
              <Todo key={index} index={index} todo={todo} markTodo={markTodo} />
          ))}
        </Primary>
      </Wrap>      
  );
}

export default App;