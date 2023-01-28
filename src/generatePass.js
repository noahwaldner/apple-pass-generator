import { Template } from "@walletpass/pass-js";
import fs from "fs";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const createPass = async ({type}) => {
  const typeMap = {
    black: "Familienkarte.pass",
    wood: "Holzkarte.pass",
    guest: "Familienkarte.pass",
    friends: "Familienkarte.pass",
  };


  const template = await Template.load(typeMap[type], undefined, {
    allowHttp: true,
  });
  template.setCertificate(process.env.APPLE_CERT, "examplepass");
  template.setPrivateKey(process.env.APPLE_PK, "examplepass");
  const pass = template.createPass();

  pass.serialNumber = "schwarz1";
  pass.description = "Familienkarte";
  pass.primaryFields.add({
    key: "name",
    label: "Name",
    value: "Noah Waldner",
  });
  pass.secondaryFields.add({
        "key": "cardType",
        "label": "Kartentyp",
        "value": "Schwarz"
  });
  pass.locations = [
    {
      longitude: 47.53966,
      latitude: 7.60681,
    },
  ];
  pass.barcodes = [
    {
      message: "https://www.dasviertel.ch/viertelklub",
      format: "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1",
    },
  ];

  const buf = await pass.asBuffer();
  return buf;
};


module.exports = { createPass };