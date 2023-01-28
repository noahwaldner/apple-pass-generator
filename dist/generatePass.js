"use strict";

var _passJs = require("@walletpass/pass-js");
var _fs = _interopRequireDefault(require("fs"));
var dotenv = _interopRequireWildcard(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const createPass = async ({
  type
}) => {
  const typeMap = {
    black: "Familienkarte.pass",
    wood: "Holzkarte.pass",
    guest: "Familienkarte.pass",
    friends: "Familienkarte.pass"
  };
  const template = await _passJs.Template.load(typeMap[type], undefined, {
    allowHttp: true
  });
  template.setCertificate(process.env.APPLE_CERT, "examplepass");
  template.setPrivateKey(process.env.APPLE_PK, "examplepass");
  const pass = template.createPass();
  pass.serialNumber = "schwarz1";
  pass.description = "Familienkarte";
  pass.primaryFields.add({
    key: "name",
    label: "Name",
    value: "Noah Waldner"
  });
  pass.secondaryFields.add({
    "key": "cardType",
    "label": "Kartentyp",
    "value": "Schwarz"
  });
  pass.locations = [{
    longitude: 47.53966,
    latitude: 7.60681
  }];
  pass.barcodes = [{
    message: "https://www.dasviertel.ch/viertelklub",
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1"
  }];
  const buf = await pass.asBuffer();
  return buf;
};
module.exports = {
  createPass
};