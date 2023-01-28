"use strict";

var _express = _interopRequireDefault(require("express"));
var _passJs = require("@walletpass/pass-js");
var _generatePass = require("./generatePass.js");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const port = 3000;
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
      value: "guest",
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
app.get("/", (req, res) => {
  res.sendFile(_path.default.join(__dirname, "./static/passes.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});