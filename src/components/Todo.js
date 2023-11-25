import React, { useEffect, useState } from "react";
import "../App.css";
import todo from "../images/todo.png";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("please fill the data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  //Delete Items
  const deleteItem = (index) => {
    const updatedItems = items.filter((currElem) => {
      return index !== currElem.id;
    });

    setItems(updatedItems);
  };

  //edit the item
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };

  //Remove all Items
  const removeAll = () => {
    setItems([]);
  };

  //Add data to LocalStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showitems">
            {items.map((currElem) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fa fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(currElem.id)}
                    ></i>
                    <i
                      className="fa fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(currElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* clear all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
