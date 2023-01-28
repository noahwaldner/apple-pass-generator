import express from "express";
import {constants} from "@walletpass/pass-js"
import { createPass } from "./generatePass.js";
import path from "path";
import html from "./passes.html"

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pass/family", (req, res) => {
  createPass({ type: { value: "black", friendlyName: "Schwarz" } }).then((pass) => {
    res.set(
      "Content-disposition",
      "attachment; filename=" + "familycard.pkpass"
    );
    res.send(pass);
  });
});

app.get("/pass/wood", (req, res) => {
  createPass({ type: { value: "wood", friendlyName: "Holz" } }).then(
    (pass) => {
      res.set(
        "Content-disposition",
        "attachment; filename=" + "holzkarte.pkpass"
      );
      res.send(pass);
    }
  );
});

app.get("/pass/guestlist", (req, res) => {
  createPass({ type: { value: "guets", friendlyName: "Guestlist" } }).then(
    (pass) => {
      res.set(
        "Content-disposition",
        "attachment; filename=" + "guestlist.pkpass"
      );
      res.send(pass);
    }
  );
});

app.get("/pass/friendslist", (req, res) => {
  createPass({type: {value: "friends", friendlyName: "Friendslist"}}).then((pass) => {
    res.set("Content-disposition", "attachment; filename=" + "friendslist.pkpass");
    res.send(pass);
  });
});

app.get("/pass", (req, res) => {

    res.sendFile(path.join(__dirname, "./passes.html"));

});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
