import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

import Accouncment from "./components/Accouncment/Accouncment";
import AddButtonAcc from "./components/AddButtonAcc/AddButtonAcc";
import Search from "./components/Search/Search";
import AccouncmentContent from "./components/Accouncment/AcciuncmentContent.jsx";
import iconMegafone from "./assets/img/iconMegafone.png";
function App() {
  const [lists, setLists] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      setLists(data);
      
    });
  }, []);
 
const onAdd=(obj)=>{
const newList=[...lists, obj];
setLists(newList)
}

const onEditName = (obj, id) => {
  const newName = window.prompt('Редагувати назву', obj.name);

  if (! newName) {
    return;
  }

  const newList = lists.map(item => {
    if (item.id === id) {
     item.name=newName
    }
    return item;
  });
  setLists(newList);
  axios
    .patch('http://localhost:3001/announcments/' + id, {
      text: newName
    })
    .catch(() => {
      alert('Не вдалося змінити імя');
    });
};
const onEditDetail = (obj, id) => {
  const newDetail = window.prompt(' Редагувати опис', obj.detail);

  if (! newDetail) {
    return;
  }

  const newList = lists.map(item => {
    if (item.id === id) {
     item.detail=newDetail
    }
    return item;
  });
  setLists(newList);
  axios
    .patch('http://localhost:3001/announcments/' + id, {
      detail: newDetail
    })
    .catch(() => {
      alert('Не вдалося змінити імя');
    });
};
const onDelete=(id)=>{
  const newLists=lists.filter(item=>item.id!==id)
  setLists(newLists)
}
const searchList=(obj, id)=>{
setLists(obj)
}

  return (
    <div className="announcments">
      <div className="announcments__name">
        <Accouncment
          items={[
            {
              icon: <img src={iconMegafone} alt="icon Megafone" />,
              name: "Всі оголошення"
            }
          ]}
        />
        <Search searchList={searchList} /> 
        {lists ? (
          <AccouncmentContent onEditName={onEditName} items={lists} isRemovable onEditDetail={onEditDetail} onDelete={onDelete}
    />
        ) : (
          "Завантаження..."
        )}
       {lists && <AddButtonAcc onAdd={onAdd} items={lists} />}
      </div>
    </div>
  );
}

export default App;
