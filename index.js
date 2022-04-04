const Axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 8080;

function md5(string) {
  return crypto.createHash("md5").update(string).digest("hex");
}

// async function test() {
//   const item = {
//     itemId: '7933475043',
//     shopid: '137426080',
//   };

//   const results = [];

//   for (let i = 0; i < 1; i++) {
//     try {
//       const qs = `itemid=${item.itemId}&shopid=${item.shopid}`;
//       const url = `https://shopee.vn/api/v2/item/get?${qs}`;

//       const hash = crypto.createHash("md5").update(`55b03${qs}55b03`).digest('hex');

//       const headers = {
//         'if-none-match-': `55b03-${hash}`,
//       };
//       const res = await rq(url, headers);
//       console.log(JSON.stringify(res));
//       // results.push(res.item.images);
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   console.log(results);
// }

// test();

async function search() {
  const data = [];
  const statProduct = [];
  const url = `https://shopee.vn/api/v2/search_items/?by=relevancy&keyword=tui-ngu&limit=20&newest=1200&order=desc&page_type=search&version=2&fbclid=IwAR2rXapNN7AVUP09AosIxyeJgyLA1XOkx3mY9RZpdr-3xSUSEBCfRcdoVH4`;
  const res = await rq(url);
  //  console.log(JSON.stringify(res));
  for (let i = 0; i < res.items.length; i++) {
    data.push(res.items[i]);
  }

  const data_filter = data.map((item) => ({
    name: item.name,
    sold: item.sold,
    stock: item.stock,
    discount: item.discount,
    liked: item.liked_count,
    rating_start: item.item_rating.rating_start,
    rating_count: item.item_rating.rating_count,
    link_product: `https://shopee.vn/item-i.${item.itemId}.${item.shopId}`,
    itemId: item.itemid,
    shopId: item.shopid,
  }));

  for(let i = 0;i < data_filter.length; i++){
    const qs = `itemid=${data_filter[i].itemId}&shopid=${data_filter[i].shopId}`;
    const url = `https://shopee.vn/api/v2/item/get?${qs}`;
  
    const hash = crypto.createHash("md5").update(`55b03${qs}55b03`).digest('hex');
  
    const headers = {
      'if-none-match-': `55b03-${hash}`,
    };
    const res = await rq(url, headers);
    statProduct.push(res);
    // results.push(res.item.images);
  
  }
  fs.writeFileSync('data.json', JSON.stringify(statProduct), 'utf-8');
}

function rq(url, headers) {
  return Axios({
    url,
    // headers
  }).then((res) => res.data);
}

search();

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.listen(port, function () {
  console.log("Your app running on port " + port);
});
