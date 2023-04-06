import React, { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [newItemData, setNewItemData] = useState({ name: '', priority: '' });
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const add = () => {
    if (newItemData.name === '' || newItemData.priority === '') 
    {
      var mess = "Don't leave anything empty";
      const para = document.getElementById("p");
      para.innerHTML=mess;
      return;
    }
    const pp = document.getElementById("p");
      pp.innerHTML="";

    const newI = { ...newItemData, index: list.length };
    const newList = [...list, newI];
    newList.sort((a, b) => a.priority - b.priority);
    setList(newList);
    setNewItemData({ name: '', priority: '' });
  };

  const remove = () => 
  {
    const newList = list.filter((item) => item.index !== selectedItemIndex);
    setList(newList);
    setSelectedItemIndex(null);
  };

  const update = (newPriority) => {
    const newList = [...list];
    const selectedItemObj = newList[selectedItemIndex];
    selectedItemObj.priority = newPriority;

    newList.sort((a, b) => a.priority - b.priority);
    setList(newList);
    setSelectedItemIndex(null);
  };

  const moveToTop = () => 
  {
    const newList = [...list];
    const itemToMove = newList[selectedItemIndex];
    newList.splice(selectedItemIndex, 1);
    newList.unshift(itemToMove);

    newList.forEach((item, index) => {
      item.index = index;
    });

    setList(newList);
    setSelectedItemIndex(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleItemClick = (index) => {
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    } else {
      setSelectedItemIndex(index);
    }
  };

  return (
    <div className="App">
      <h1>My Wish List</h1>
      <div className="add-item">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItemData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={newItemData.priority}
          onChange={handleInputChange}
        />
        <button onClick={add}>Add Item</button>
        <p id="p"></p>
      </div>
      {list.map((item) => (
        <div
          key={item.index}
          onClick={() => handleItemClick(item.index)}
          className={`item ${item.index === selectedItemIndex ? 'selected' : ''}`}
        >
          <h3>
            {item.name}
            <span className="priority">{item.priority}</span>
          </h3>
        </div>
      ))}
      {selectedItemIndex !== null && (
        <div className="buttons">
          <button onClick={remove}>Remove</button>

          <button
            onClick={() => {
              const newPriority = prompt('Enter new priority:');
              update(newPriority);
            }}
          >
            Update Priority
          </button>
          <button onClick={moveToTop}>Move to Top</button>
        </div>
      )}
    </div>
  );
 }

export default App;
