import express from "express";
import {constants} from "@walletpass/pass-js"
import { createPass } from "./generatePass.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get("/pass", (req, res) => {
  createPass().then((pass) => {
    res.set("Content-disposition", "attachment; filename=" + "pass.pkpass");
    console.log(pass);
    res.send(pass);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
