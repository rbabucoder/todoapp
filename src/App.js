import React, {useState, useEffect} from "react";

const App =() =>{
  
  const getLocalData = () => {
 const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

  
  
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  
  
  const addItem =(e) =>{
    if(e.keyCode === 13){
      if(!inputData){
        alert("input field is empty");
      }
      else{
   const allInputData = {id: new Date().getTime().toString(), name : inputData };
    setItems([...items, allInputData ]);
    setInputData("");
      }
      
    }
  }
  
  const deleteItem =(index) =>{
   const updateditem= items.filter((elem)=>{
      return index !== elem.id;
    });
    setItems(updateditem);
  }
  
  
 const editItem = (id) =>{
   let newEditItem = items.find((elem)=>{
     return elem.id === id;
     
   });
   setInputData(newEditItem.name);
   
   setIsEditItem(id);
 }
 
  const addEditItem =(inputdata) =>{
   
    setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
  }
  
  
  

    useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  
  return (
  <>
<div className="main_div">
  <div className="center_div">
        <br />
        <h1> ToDo List </h1>
        <br />
        <input 
        type="text" 
        placeholder="Add a Items"
        value={inputData}
        onChange={(e)=>{setInputData(e.target.value)}} onKeyUp={addItem} />
      
    <button title="select edit item into list" onClick={()=>{addEditItem(inputData)}}>put edit item into list press button</button>
      <ol>
        {items.map((elem, ind)=>{
          return (
          <div className="todo_style" key={elem.id}>
      <i class="fa fa-times" aria-hidden="true" onClick={()=>{deleteItem(elem.id)}}></i>
      <i class="fa fa-edit" aria-hidden="true"onClick={()=>{editItem(elem.id)}}></i>
          <li>{elem.name}</li>
          </div>
          )
        })}
      </ol>
    
        
  
</div>
</div>
    
  </>
    
    );
}

export default App;