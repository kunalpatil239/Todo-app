import React, { useState, useEffect } from "react";
import "./style.css";

//get local storage data back

const getLocalData = () => {
  const list = localStorage.getItem("mytodolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setIsToggleButton] = useState(false);

  //add items function

  const addItem = () => {
    if (!inputData) {
      alert("fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEditItem) {
            return { ...curEle, name: inputData };
          }
          return curEle;
        })
      );
      setInputData("");
      setIsToggleButton(false);
      setIsEditItem(null);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items

  const editItem = (id) => {
    const item_edited = items.find((curEle) => {
      return curEle.id === id;
    });
    setInputData(item_edited.name);
    setIsEditItem(id);
    setIsToggleButton(true);
  };

  //delete item function

  const deleteItem = (id) => {
    const updatedItem = items.filter((curEle) => {
      return curEle.id !== id;
    });
    setItems(updatedItem);
  };

  //remove all the elements

  const removeAll = () => {
    setItems([]);
  };

  //adding localStorage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="logo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍🏼 Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items */}
          <div className="showItems">
            {items.map((curEle) => {
              return (
                <div className="eachItem" key={curEle.id}>
                  <h3>{curEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
