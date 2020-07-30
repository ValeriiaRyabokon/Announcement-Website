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
        {lists ? <Search items={lists} /> : "jklddd"}
        {lists ? (
          <AccouncmentContent items={lists} isRemovable />
        ) : (
          "Завантаження..."
        )}
        {lists && <AddButtonAcc onAdd={onAdd} items={lists} />}
      </div>
    </div>
  );
}

export default App;
