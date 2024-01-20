import React, { useEffect, useReducer, useRef } from "react";
import './Task.css'

const reducer = (state, action) => {
  // console.log("reducer called");
  switch (action.type) {
    case "ADDTASK":
      // console.log(state)
      return [...state, { text: action.text, isHidden: false }];
    case "HIDETASK":
      return state.map((each, index) =>
        index === action.index ? { ...each, isHidden: !each.isHidden } : each
      );
    default:
      return state;
  }
};

function Task() {
  const [task, dispatch] = useReducer(reducer, []);
  const inputRef = useRef(null);

  const handleFocus=()=>{
    inputRef.current.focus();
  }

  useEffect(() => {
    handleFocus()
  }, []);

  const handleClick = () => {
    if ( inputRef.current.value !==""){
      dispatch({ type: "ADDTASK", text: inputRef.current.value });
      inputRef.current.value=""
      inputRef.current.focus();
    }
  };

  const handleToggleTask = (index) => {
    // console.log("Toggle called");
    dispatch({ type: "HIDETASK", index: index });
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <div>
      <input
        type="text"
        onKeyDown={(e) => {
          e.key == "Enter" && handleClick();
        }}
        ref={inputRef}
        placeholder="Enter your task"
      />
        <button className="create" onClick={handleClick}>Create</button>
      </div>

      {task.map((each, index) => {
        return (
          <div className="taskList" key={index}>
            {each.isHidden ? (
              <h3>[ The content is hidden ]</h3>
            ) : (
              <h3>{each.text}</h3>
            )}
            <button onClick={() => handleToggleTask(index)}>Toggle</button>
          </div>
        );
      })}

{
        task.length >= 10 && (
          <button onClick={handleFocus} style={{backgroundColor:'blue'}} className="backToFocus">Back To Write</button>
        )
      }
    </div>
  );
}

export default Task;
