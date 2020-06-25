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
//electronics

const product = [
  {
    title: "Skullcandy Uproar Bluetooth Headset with Mic ",
    imageUrl: "https://24eshop.in/wp-content/uploads/2018/08/Skullcandy_Headphone_UPROARBT_S5URHW-462_11_1100_Angle_Gray.jpg",
    Price: 2499,
    Desc: "Experience true comfort and freedom with the Uproar Wireless headphones. These headphones feature Supreme Sound technology that ensures seamless audio clarity. With 10-hours of battery life and Bluetooth connectivity, you can listen to great-sounding music wherever you go.",
    category: 'electronics'
  },
  {
    title: "DELL XPS 15",
    imageUrl: "https://www.lifewire.com/thmb/eHrBCZqTCXeoCl7cSkBngIzaZAo=/1500x1500/filters:fill(auto,1)/_hero_SQ_Dell-XPS-13-Two-in-One-Computer-1-c8f6c090145a4de69ca1c90f75659abe.jpg",
    Price: 149000,
    Desc: "Dell’s smallest 39.62cm (15.6) performance laptop with a stunning OLED display option. Now featuring 9th Gen Intel® Core™ processors.",
    category: 'electronics'
  },
  {
    title: "iPhone 11",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k2jbyq80pkrrdj/mobile-refurbished/x/j/s/iphone-11-128-d-mwm02hn-a-apple-0-original-imafkg242ugz8hwc.jpeg?q=70",
    Price: 73990,
    Desc: "Featuring a 15.49-cm (6.1) all-screen Liquid Retina LCD and a glass and aluminum design, the iPhone 11 is as beautiful as it gets. Also, the IP68 rating ensures that is water-resistant up to 2 meters for 30 minutes.",
    category: 'electronics'
  },
  {
    title: "Samsung 108cm (43 inch) Full HD LED Smart TV ",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jzog9e80/television/x/q/z/samsung-ua43n5300arlxl-ua43n5300arxxl-original-imafjmyxgh8r2nef.jpeg?q=70",
    Price: 33999,
    Desc: "With this Samsung Smart TV, you can now combine both work and fun. Its ability to convert to a computer makes it highly efficient. You can work when you want to, and once you are bored, you can switch to unlimited entertainment. It can also be used as a virtual music system. You can also share content from your phone to this TV and enjoy videos and photos with your family. ",
    category: 'electronics'
  },
  {
    title: "Motorola AmphisoundX 80 W Bluetooth Home Theatre ",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/kbi9h8w0/speaker/home-theatre/2/w/w/mt80-ht51-motorola-original-imafsubjwxrnrzmc.jpeg?q=70",
    Price: 7999,
    Desc: "It has a wireless remote for ease of use . It has a High Output and crystal clear natural sound. It is a perfect home entertainment audio system with state of art technology and European Design .For those who prefer true value , attractive looks and superior performance this is the right choice . Just Plug-In and enjoy .",
    category: 'electronics'
  },
  {
    title: "LG 687 L Frost Free Side by Side Refrigerator",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/refrigerator-new/h/d/6/lg-gc-b247sluv-original-imaepz7nxqgmxcjd.jpeg?q=70",
    Price: 77999,
    Desc: "With the LG 687 L Frost Free refrigerator in your kitchen, your midnight hunger pangs will get satiated by almost all types of food items. This kitchen essential features an Inverter Linear Compressor, a Multi Air Flow Cooling system, and Multi Digital Sensors for powerful, effective, and fast cooling.",
    category: 'electronics'
  }
]

//homeandfurniture
const product = [
  {
    title: "Artesia SCFP-856 MDF (Medium Density Fiber) Wall Shelf  (Number of Shelves - 6, Yellow)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k3yrte80/rack-shelf/g/n/t/dattachbkyellow1-xylm-original-imaffsahp2eh8dzd.jpeg?q=70",
    Price: 1499,
    Desc: "Artesia Intersecting MDF Wall Shelves Set of 6 This Wall Shelves unit is the ultimate stylish yet functional piece for your living space. It offers a surprising amount of space for storing books, pictures, and other decorative items. Plus it just looks really cool. Made in the mid century modern style, with clean lines and an interesting geometric shape, it transforms your room just by being there.",
    category: 'homeandfurniture'
  },
  {
    title: "Ajanta Analog 33 cm X 33 cm Wall Clock  (Multicolor, With Glass)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k3yrte80/rack-shelf/g/n/t/dattachbkyellow1-xylm-original-imaffsahp2eh8dzd.jpeg?q=70",
    Price: 544,
    Desc: "PRINTED Wooden Wall Clock With Beautiful Design For Your Living Room Or Bed Room OR KIDS ROOM. The Product Is Made High Quality Colors, Kundan Pearls Studded Decorated On Wood Along With Colour Glasses. It Is Durable And Look Elegant And Feel Royal For Oneself At Home.",
    category: 'homeandfurniture'
  },
  {
    title: "Perfect Homes Malta Fabric 3 Seater Sofa  (Finish Color - Blue)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jxkpx8w0/sofa-sectional/y/r/a/blue-polyester-scbl3gc301-flipkart-perfect-homes-blue-original-imafhzzanhzxddct.jpeg?q=70",
    Price: 12290,
    Desc: "Rest on this recliner after a hectic day and cuddling with the two inflatable pillows. Is there anything more relaxing than this? Unlike other Inflatable Sofa cum Beds, The Air Lounge is designed with Surround Suspension Air Technology that provides proper support to your body while sitting or sleeping. It is made of high-quality, durable material that will last for years.",
    category: 'homeandfurniture'
  },
  {
    title: "SIGNOTECH Uplight Wall Lamp",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k7usyvk0/wall-lamp/v/d/t/899mn-signotech-original-imafpzdm9hfkvm93.jpeg?q=70",
    Price: 599,
    Desc: "Give your home increased touch of sophistication and class with this unique and stylish looking product from . This is a three light industrial looking small pendant, this light fixture provide a very classy and antique industrial look, This lamp is a hard wired fixture. This fixture doesn’t have a glass or plastic globe it is made of metal.",
    category: 'homeandfurniture'
  },
  {
    title: "Nilkamal Jewel Solid Wood 4 Seater Dining Set  (Finish Color - Walnut)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jfwuz680/dining-set/u/d/w/4-seater-brown-rubber-wood-fidsjewelkit4stwlt-home-by-nilkamal-original-imaf49qgegasecgv.jpeg?q=70",
    Price: 13410,
    Desc: "Made of rubber wood, this furniture is resistant to shrinkage which makes it perfect all weather conditions across India.Made from reused rubber trees, this dining table is stronger and more sustainable.",
    category: 'homeandfurniture'
  },
  {
    title: "TC Cotton Double Geometric Bedsheet  (Pack of 1, Yellow)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jwzabgw0/bedsheet/g/9/e/bdsyellowapril1-bd104tcyw1-flat-flipkart-smartbuy-original-imafhjkhzh7hzpyt.jpeg?q=70",
    Price: 369,
    Desc: "Enrich your bedroom with art, culture and tradition with our wide range of ethnically designed bed sheets. Inspired by rich and diversified Indian culture, these bed sheets feature a distinctive style that gives a traditional feel to your home.Metro Living offers products with 100% cotton fabric. ",
    category: 'homeandfurniture'
  }

]
const product = [
  {
    title: "United Colors of Benetton Men Solid Casual Button Down Shirt",
    imageUrl: "https://rukminim1.flixcart.com/image/880/1056/k0flmkw0/shirt/y/c/k/m-18a5db19u008i-united-colors-of-benetton-original-imafk7jy5pcfdbm8.jpeg?q=50",
    Price: 879,
    Desc: "Casual T-Shirt",
    category: 'Apparels'
  },
  {
    title: "Lee Men Dark Blue Jeans",
    imageUrl: "https://rukminim1.flixcart.com/image/880/1056/k0flmkw0/jean/c/5/a/32-l36170248smu-lee-original-imafk74z7nwpvxat.jpeg?q=50",
    Price: 874,
    Desc: "Men's Jeans Dark Blue",
    category: 'Apparels'
  },
  {
    title: "Louis Philippe Sport Solid Single Breasted Casual Men Blazer  (Blue)",
    imageUrl: "https://rukminim1.flixcart.com/image/880/1056/k4hcjgw0/blazer/d/y/g/44-lybzcsspu46944-louis-philippe-sport-original-imafndfyk9ggcudm.jpeg?q=50",
    Price: 4199,
    Desc: "Men's Readymade suit from Louis Philippe",
    category: 'Apparels'
  },
  {
    title: "Park Avenue Men Solid Formal Spread Shirt",
    imageUrl: "https://rukminim1.flixcart.com/image/880/1056/k3q76a80/shirt/q/2/u/xs-pmsx13722-b5-park-avenue-original-imafmsc2ccarngx3.jpeg?q=50",
    Price: 719,
    Desc: "Men's Solid Formal T-Shirt",
    category: 'Apparels'
  },
  {
    title: "Highlander Men Solid Casual Mandarin Shirt",
    imageUrl: "https://rukminim1.flixcart.com/image/880/1056/k70spzk0/shirt/6/g/5/m-hlsh009648-highlander-original-imafpchn9mzgbhww.jpeg?q=50",
    Price: 499,
    Desc: "Men's Casual T-Shirt",
    category: 'Apparels'
  },
  {
    title: "Raymond Slim Fit Men Grey Cotton Blend Trousers",
    imageUrl: "https://rukminim1.flixcart.com/image/880/1056/k3ahbww0/trouser/k/x/v/32-rctl00428-k8-raymond-original-imafmdfhwshttkyq.jpeg?q=50",
    Price: 999,
    Desc: "Men's Casual Trouser",
    category: 'Apparels'
  }
]
//books
const product = [
  {
    title: "The Passengers  (English, Paperback, Marrs John)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k0r15e80/book/5/2/6/the-passengers-original-imafk6feshbxwxg5.jpeg?q=70",
    Price: 359,
    Desc: "Eight self-drive cars set on a collision course. Who lives, who dies? You decide.The new gripping page-turning thriller from the bestselling author of THE ONE - soon to be a major Netflix series.When someone hacks into the systems of eight self-drive cars, their passengers are set on a fatal collision course. The passengers are: a TV star, a pregnant young woman, a disabled war hero, an abused wife fleeing her husband, an illegal immigrant, a husband and wife - and parents of two - who are travelling in separate vehicles and a suicidal man. Now the public have to judge who should survive but are the passengers all that they first seem?",
    category: 'books'
  },
  {
    title: "Now You See Her  (English, Paperback, Perks Heidi)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k1jlyfk0/book/7/8/2/now-you-see-her-original-imafk6a8wsjzt6cy.jpeg?q=70",
    Price: 399,
    Desc: "____________________________She was your responsibility. And now she's missing.`I flew through this book in three days, with my heart in my mouth' Lisa Jewell`Believe us when we say this novel is the real deal' Heat `A gripping tale of friendship and deceit, where nothing is what it seems....",
    category: 'books'
  },
  {
    title: "The Secret Crusade  (English, Paperback, Bowden Oliver)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jb13te80/book/9/9/7/assassin-s-creed-the-secret-crusade-original-imafyhf9yrwbn9ph.jpeg?q=70",
    Price: 882,
    Desc: "One of the best books in Crime,Mystery",
    category: 'books'
  },
  {
    title: "The Shining  (English, Paperback, King Stephen)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jp8ngcw0-1/book/7/2/3/the-shining-original-imafbj6mmcyzwmpf.jpeg?q=70",
    Price: 343,
    Desc: "Stephen King's definitive horror novel, The Shining, tells the story of Jack Torrance who takes his family to the Overlook Hotel, where things turn catastrophic.",
    category: 'books'
  },
  {
    title: "The Awakening and the Struggle - The Awakening & the Struggle  (English, Paperback, Smith L. J.)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jpmxuvk0/book/9/7/6/the-vampire-diaries-original-imafbtgcf8zbvfvz.jpeg?q=70",
    Price: 656,
    Desc: "Blood brothers . . .After his brother, Damon Salvatore, betrays him in New Orleans, Stefan starts over in Manhattan. Vowing never to harm another human, he roams the streets, trying to disappear into the city’s chaos. But just when he thinks he’s left his past behind, Stefan discovers that he can never escape his brother. Damon has grand plans for the vampire Salvatore brothers—whether Stefan likes it or not",
    category: 'books'
  },
  {
    title: "Discovering the Vedas  (English, Paperback, Staal Frits)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jplif0w0/book/8/6/4/discovering-the-vedas-origins-mantras-rituals-insights-original-imafbswffpeza4zz.jpeg?q=70",
    Price: 429,
    Desc: "Discovering the Vedas - Origins, Mantras, Rituals, Insights, written by Frits Staal, is an insightful book that tries to understand one of the oldest spiritual and philosophical traditions of India.",
    category: 'books'
  }

]
//kids
const product = [
  {
    title: "Zurie Toy Collection Off Road Monster Racing Car, Remote Control , 1:20 Scale, Black  (Black)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jkybwcw0/remote-control-toy/z/h/b/big-and-mean-rock-crawling-1-20-scale-modified-off-road-hummer-original-imaeujsgdp2cf5rb.jpeg?q=70",
    Price: 998,
    Desc: "Dominate any type of terrain with the all new off road 1:20 hummer electric rtr monster car. Featuring a full function transmitter, this awesome hummer monster car allows you to control every single move it makes with ease. But don't think this remote controlled hummer is only good for off reading because this bad boy can haul on and off the road.",
    category: 'kids'
  },
  {
    title: "Disney Avengers Super Hero 3 wheel scooter - Blue & Red  (Red, Blue)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/jnamvm80/outdoor-toy/f/f/q/avengers-super-hero-3-wheel-scooter-blue-red-disney-original-imafaygs6hwgz5tf.jpeg?q=70",
    Price: 1199,
    Desc: "Avengers presents a cool ride for your little one. This stylish and trendy scooter will serve as an ideal playtime companion for your kids. This scooter features a steering bar. The scooter is lightweight, foldable and compact. It also has a brake at the front and also a stand to park. Enhance flexibility and improve balance ability.",
    category: 'kids'
  },
  {
    title: "Miss & Chief 2 Sided 17-inch Roll Up Magnetic Dart Board Set with 6 Darts Party & Fun Games Board Game",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k0e66q80/board-game/p/s/x/magnetic-darts-target-with-6-darts-miss-chief-original-imafk4zu3tpbybzs.jpeg?q=70",
    Price: 499,
    Desc: "This 17inch dart board come with a soft tip instead of the traditional needle but this is not only great and safe for kids but also for adults as this of high quality. It has a flexible high quality cloth covered board that can be easily rolled up and hung anywhere. Since there is no needle, no part of the background will be affected.",
    category: 'kids'
  },
  {
    title: "Hand Stand Remote control helicopter  (Green)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k63xle80/remote-control-toy/n/q/p/hand-stand-remote-control-helicopter-kidsbazaar-original-imafz6c6fzjbwfcg.jpeg?q=70",
    Price: 479,
    Desc: "1 Helicopter with remote controller and data cable",
    category: 'kids'
  },
  {
    title: "Spiderman Pre-School Wall Crawler (LKG/UKG/1st std) School Bag  (Multicolor, 14 inch)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k84t1u80/bag/y/m/a/wall-crawler-spiderman-16-original-imafq7yyfbyu8k4h.jpeg?q=70",
    Price: 499,
    Desc: "This Spiderman attractive school bag is tailored keeping in mind kids hectic school work load. It is so spacious, trendy and attractive that your school going children will love to carry. It Is not only superior in quality and finish but also very durable, affordable prevents backaches in small children. It has been specifically made for the purpose of hassle-free carriage of books by young children.",
    category: 'kids'
  },
  {
    title: "Webby Wooden Counting Numbers (1 to 20) Educational Toy Tray for Kids  (25 Pieces)",
    imageUrl: "https://rukminim1.flixcart.com/image/416/416/k7c88sw0/puzzle/a/v/s/25-wooden-counting-numbers-1-to-20-educational-toy-tray-for-kids-original-imafpkvxghzezs7b.jpeg?q=70",
    Price: 399,
    Desc: "Colorful wooden numbers with mathematical signs. Wooden number puzzle for kids is a new classic way for educating kids.",
    category: 'kids'
  }

]

axios({
  method: 'post',
  url: 'http://localhost:4000/addProduct',
  data: product,
  'Content-Type': 'application/json'
})


app.listen(5000);