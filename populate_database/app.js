const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const faker = require('faker');

for(let i=0; i<10; ++i) {
  console.log(faker.name.findName());
  console.log(faker.image.imageUrl());
  console.log(faker.image.fashion());
}

app.listen(5000);