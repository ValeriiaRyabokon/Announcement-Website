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

  const visibleLists=()=>{
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      setLists(data);
    });
  }

  const onAdd = obj => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  
  const onEdit = (obj, id, type, text) => {
    const newDetail = text;

    if (!newDetail) {
      return;
    }

    const newList = lists.map(item => {
      if (item.id === id) {
        item[type] = newDetail;
      }
      return item;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/announcments/" + id, {
       [type]: newDetail
      })
      .catch(() => {
        alert("Не вдалося змінити імя");
      });
  };
  const onDelete = id => {
    const newLists = lists.filter(item => item.id !== id);
    setLists(newLists);
  };
  const searchLists=(obj)=>{
    setLists(obj)
    
  }
 /* const searchList = (obj, id) => {
    const newList = lists.filter(item => item.id === id);
    setLists(newList);
  };*/


  return (
    <div className="announcments">
      
        <Accouncment
          items={[
            {
              icon: <img src={iconMegafone} alt="icon Megafone" />,
              name: "Всі оголошення"
            }
          ]
          }
          visibleLists={visibleLists}
        />
        <Search  searchLists={searchLists}  />
        {lists ? (
          <AccouncmentContent
            onEdit={onEdit}
            items={lists}
            isRemovable
            //searchList={searchList}
           
            onDelete={onDelete}
          />
        ) : (
          "Завантаження..."
        )}
        <AddButtonAcc onAdd={onAdd} />
      
    </div>
  );
}

export default App;
