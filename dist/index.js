"use strict";

var _express = _interopRequireDefault(require("express"));
var _passJs = require("@walletpass/pass-js");
var _generatePass = require("./generatePass.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/pass", (req, res) => {
  (0, _generatePass.createPass)().then(pass => {
    res.set("Content-disposition", "attachment; filename=" + "pass.pkpass");
    console.log(pass);
    res.send(pass);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});