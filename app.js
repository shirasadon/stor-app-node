const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const client = require("./models/client");
const order = require("./models/order");
const store = require("./models/store");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
var mongoDB = "mongodb://127.0.0.1/ten-wolt";

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//all post request
app.post("/order", (req, res) => {
  res.send("order");
});

app.post("/client", (req, res) => {
  res.send("client!");
  let name = req.body.name,
    aderss = req.body.adress,
    isvip = req.body.isvip,
    phone = req.body.phone;
  let newclient = new client({
    name: name,
    adress: aderss,
    isvip: isvip,
    phone: phone,
  });
  newclient.save((err, data) => {
    console.log(err);
    console.log(data);
  });

  app.post("/store", (req, res) => {
    res.send("store");
  });

  //all get request

  app.get("/allstore", (req, res) => {
    res.send(" all store");
  });

  app.get("/allclient", (req, res) => {
    res.send(" all client");
  });

  app.get("/allorder", (req, res) => {
    res.send("all order");
  });

  //update

  app.get("/uporder/:id", (req, res) => {
    // res.send("order")
    order.findOneAndUpdate(req.params.id, {}, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.send(data);
      }
    });
  });

  app.get("/upclient/:id", (req, res) => {
    // res.send("client!");
    client.findOneAndUpdate(req.params.id, {}, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.send(data);
      }
    });
  });

  app.get("/upstore/:id", (req, res) => {
    // res.send("store");
    store.findOneAndUpdate(req.params.id, {}, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
  });
});
mongoose
  .connect(mongoDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((e) => console.error(e));