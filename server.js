// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import contactRoutes from "./routes/contactRoutes.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors(3000));


const contactsData = JSON.parse(fs.readFileSync('./data/contacts.json'));

app.use("/api/v1/contact",contactRoutes)

const PORT=process.env.PORT || 8080;
app.listen(PORT);
console.log(PORT);