import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Product() {
  let [partname, setPartname] = React.useState("");
  let [partnumber, setPartnumber] = React.useState("");
  let [partqueantity, setPartqueantity] = React.useState("");
  let [partprice, setPartprice] = React.useState("");
  let [id, setId] = React.useState("");
  let [part, setPart] = React.useState([]);
  let [requestPart, setrequestPart] = React.useState([]);

  let [edit, setEdit] = useState(false);

  React.useEffect(() => {
    getpart();
    getrequestpart();
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

  async function getrequestpart() {
    try {
      let data = await axios.get("http://localhost:5000/getrequestpart");
      console.log(data.data);
      setrequestPart(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createpat() {
    try {
      let data = await axios.post("http://localhost:5000/createpart", {
        partname: partname,
        partnumber: partnumber,
        partqueantity: partqueantity,
        partprice: partprice,
      });
      if (data.status === 201) {
        console.log("success");
        getpart();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editPart(id) {
    try {
      let data = await axios.patch(`http://localhost:5000/update/${id}`, {
        partname: partname,
        partnumber: partnumber,
        partqueantity: partqueantity,
        partprice: partprice,
      });
      if (data.status === 200) {
        console.log("success");
        getpart();
        setEdit(false);
        setPartname("");
        setPartnumber("");
        setPartqueantity("");
        setPartprice("");
        setId("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePart(id) {
    try {
      let data = await axios.delete(`http://localhost:5000/delete/${id}`);
      if (data.status === 200) {
        console.log("success");
        getpart();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <nav>
        <h1>This is for Inventory Manager</h1>
      </nav>
      <div>
        <div className="manager">
          <Link to="/engineer">If you are a Engineer</Link>
        </div>
        <div className="create-form">
          <h1>create parts</h1>
          <input
            type="text"
            placeholder="name"
            value={partname}
            onChange={(e) => setPartname(e.target.value)}
          />
          <input
            type="text"
            placeholder="number"
            value={partnumber}
            onChange={(e) => setPartnumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="quantity"
            value={partqueantity}
            onChange={(e) => setPartqueantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="price"
            value={partprice}
            onChange={(e) => setPartprice(e.target.value)}
          />{" "}
          {edit ? (
            <button onClick={() => editPart(id)}>Edit part</button>
          ) : (
            <button onClick={() => createpat()}>Add part</button>
          )}
        </div>
        <div>
          <h1>all available parts</h1>
          <div className="main">
            {part.map((row) => {
              return (
                <div className="box" key={row._id}>
                  <h3>Title: {row.partname}</h3>
                  <p>Part Number: {row.partnumber}</p>
                  <p>Quantity: {row.partqueantity}</p>
                  <p>Price: {row.partprice}</p>
                  <button onClick={() => deletePart(row._id)}>Delete</button>
                  <button
                    onClick={() => {
                      setPartname(row.partname);
                      setPartnumber(row.partnumber);
                      setPartqueantity(row.partqueantity);
                      setPartprice(row.partprice);
                      setId(row._id);
                      setEdit(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <hr style={{ margin: "10px" }} />
      <div>
        <h1>list of requested parts</h1>
        <div className="main">
          {requestPart.map((row) => {
            return (
              <div className="box" key={row._id}>
                <h3>Title: {row.partname}</h3>
                <p>Part Number: {row.partnumber}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Product;
