import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usermodel } from "./model/user.js";
import { partmodel } from "./model/partmodel.js";
import { requestpart } from "./model/requestpart.js";
let app = express();
app.use(express.json());
app.use(cors());
async function ConnectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/cosys");
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}
ConnectDb();

// create user
app.post("/signup", async (req, res) => {
  try {
    let create = new usermodel(req.body);
    await create.save();
    res.status(201).json(create);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, pass } = req.body;
    let find = await usermodel.findOne({ email, pass });
    if (!find) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/createpart", async (req, res) => {
  try {
    let create = new partmodel(req.body);
    await create.save();
    res.status(201).json(create);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/requestpart", async (req, res) => {
    try {
      let create = new requestpart(req.body);
      await create.save();
      res.status(201).json(create);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/getrequestpart", async (req, res) => {
    try {
      let get = await requestpart.find();
      res.status(201).json(get);
    } catch (error) {
      res.status(500).json(error);
    }
  });

app.get("/getpart", async (req, res) => {
  try {
    let find = await partmodel.find();
    res.status(200).json(find);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let find = await partmodel.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { partname, partnumber, partqueantity, partprice } = req.body;
    let find = await partmodel.findByIdAndUpdate(id, {
      partname,
      partnumber,
      partqueantity,
      partprice,
    });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});


app.listen(5000, () => {
  console.log("run");
});
