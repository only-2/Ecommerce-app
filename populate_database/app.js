const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const faker = require('faker');
for(let i=0; i<10; ++i) {
  console.log(faker.name.findName());
  console.log(faker.image.imageUrl());
  console.log(faker.image.fashion());
}

const product = {
  title: "haha",
  imageUrl: null,
  Price: 100,
  Desc: "I am product 1",
  category: 'electronics'
}

axios({
  method: 'post',
  url: 'http://localhost:4000/addProduct',
  data: product,
  'Content-Type': 'application/json'
})


app.listen(5000);