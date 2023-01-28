"use strict";

var _express = _interopRequireDefault(require("express"));
var _passJs = require("@walletpass/pass-js");
var _generatePass = require("./generatePass.js");
var _path = _interopRequireDefault(require("path"));
var _passes = _interopRequireDefault(require("./passes.html"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/pass/family", (req, res) => {
  (0, _generatePass.createPass)({
    type: {
      value: "black",
      friendlyName: "Schwarz"
    }
  }).then(pass => {
    res.set("Content-disposition", "attachment; filename=" + "familycard.pkpass");
    res.send(pass);
  });
});
app.get("/pass/wood", (req, res) => {
  (0, _generatePass.createPass)({
    type: {
      value: "wood",
      friendlyName: "Holz"
    }
  }).then(pass => {
    res.set("Content-disposition", "attachment; filename=" + "holzkarte.pkpass");
    res.send(pass);
  });
});
app.get("/pass/guestlist", (req, res) => {
  (0, _generatePass.createPass)({
    type: {
      value: "guets",
      friendlyName: "Guestlist"
    }
  }).then(pass => {
    res.set("Content-disposition", "attachment; filename=" + "guestlist.pkpass");
    res.send(pass);
  });
});
app.get("/pass/friendslist", (req, res) => {
  (0, _generatePass.createPass)({
    type: {
      value: "friends",
      friendlyName: "Friendslist"
    }
  }).then(pass => {
    res.set("Content-disposition", "attachment; filename=" + "friendslist.pkpass");
    res.send(pass);
  });
});
app.get("/pass", (req, res) => {
  res.sendFile(_path.default.join(__dirname, "./passes.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});