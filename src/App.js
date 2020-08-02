import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

import Accouncment from "./components/Accouncment/Accouncment";
import AddButtonAcc from "./components/AddButtonAcc/AddButtonAcc";
import Search from "./components/Search/Search";
import AccouncmentContent from "./components/Accouncment/AcciuncmentContent.jsx";
import iconAcc from "./assets/img/iconAcc.png";

function App() {
  const [lists, setLists] = useState(null);
  const [visible, setVisible] = useState({
    visibleValue: false,
    visibleSearch: true,
    visibleDetails: false
  });

  useEffect(() => {
    visibleLists();
  }, []);

  const visibleLists = () => {
    setVisible({
      visibleValue: false,
      visibleSearch: true,
      visibleDetails: false
    });
    axios.get("http://localhost:3001/announcments").then(({ data }) => {
      setLists(data);
    });
  };

  const onAdd = obj => {
    setLists([...lists, obj]);
  };

  const onEdit = (id, type, text) => {

    if (!text) {
      return;
    }

    const newList = lists.map(item => {
      if (item.id === id) {
        item[type] = text;
      }
      return item;
    });
    setLists(newList);
    axios
      .patch(`http://localhost:3001/announcments/${id}`, {
        [type]: text
      })
      .catch(() => {
        alert("Не вдалося змінити імя");
      });
  };
  const onDelete = id => {
    const newLists = lists.filter(item => item.id !== id);
    setLists(newLists);
  };
  const searchLists = obj => {
    setLists(obj);
  };
  const searchList = (obj, id) => {
    const newList = lists.filter(item => item.id === id);
    setLists(newList);
  };

  return (
    <div className="announcments">
      <Accouncment
        items={[
          {
            icon: <img src={iconAcc} alt="icon Megafone" />,
            name: "Announcements"
          }
        ]}
        visibleLists={visibleLists}
      />
      <Search searchLists={searchLists} visibleLists={visibleLists} />
      {lists ? (
        <AccouncmentContent
          onEdit={onEdit}
          items={lists}
          isRemovable
          searchList={searchList}
          onDelete={onDelete}
          visible={visible}
          setVisible={setVisible}
        />
      ) : (
        "Завантаження..."
      )}
      <AddButtonAcc onAdd={onAdd} />
    </div>
  );
}

export default App;
