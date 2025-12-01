require("dotenv").config();
const express = require("express");
const request = require("request");

const app = express();
const PORT = 4000;
// const cors = require("cors");
// app.use(cors());

app.use(express.static("public"));

// Read from .env
const DEST_URL = process.env.DEST_URL;
const USERNAME = process.env.DEST_USER;
const PASSWORD = process.env.DEST_PASS;

// OData endpoint
const ODATA_PATH = "/sap/opu/odata/sap/Z301617_SALES_SRV/salesHeaderSet?$format=json";

app.get("/sales", (req, res) => {
  const options = {
    url: DEST_URL + ODATA_PATH,
    method: "GET",
    headers: {
      "Authorization":
        "Basic " + Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).send("Error: " + error);
    }

    res.send(body);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
