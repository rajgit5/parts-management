import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
function Engineer() {
  let [partname, setPartname] = React.useState("");
  let [partnumber, setPartnumber] = React.useState("");
  let [part, setPart] = React.useState([]);

  React.useEffect(() => {
    getpart();
  }, []);

  async function getpart() {
    try {
      let data = await axios.get("http://localhost:5000/getpart");
      console.log(data.data);
      setPart(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function requestPartToManager() {
    try {
      let data = await axios.post("http://localhost:5000/requestpart", {
        partname: partname,
        partnumber: partnumber,
      });
      if (data.status === 201) {
        console.log("success");
       alert("your part requested to inventory manager")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <nav><h1>This is for Engineer</h1></nav>
      <div className="manager"><Link to="/product">If you are Inventory Manage</Link></div>
      <div>
        <input
          type="text"
          placeholder="partname"
          value={partname}
          onChange={(e) => setPartname(e.target.value)}
        />
        <input
          type="text"
          placeholder="number"
          value={partnumber}
          onChange={(e) => setPartnumber(e.target.value)}
        />
        <button onChange={() => requestPartToManager()}>Request part</button>
      </div>

      <h1>all available parts</h1>
      <div className="main">
        {part.map((row) => {
          return (
            <div className="box" key={row._id}>
              <h3>Title: {row.partname}</h3>
              <p>Part Number: {row.partnumber}</p>
              <p>Quantity: {row.partqueantity}</p>
              <p>Price: {row.partprice}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Engineer;
