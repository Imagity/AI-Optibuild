const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dragonball',
  database: 'ai_optibuild'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Function to calculate build category
function getBuildCategory(totalPrice) {
  if (totalPrice <= 700) {
    return 'Daily Use';
  } else if (totalPrice > 700 && totalPrice < 1700) {
    return 'Gaming';
  } else if (totalPrice >= 1700 && totalPrice < 4000) {
    return 'Workstation';
  } else {
    return 'Editing';
  }
}

// Route to get all builds with their categories
app.get('/builds', (req, res) => {
  let sql = `
    SELECT b.id, b.name, b.price AS build_price, b.description, b.img AS build_img,
           p.price AS processor_price, ps.price AS power_supply_price, s.price AS storage_price,
           cc.price AS cpu_cooler_price, pc.price AS pc_case_price, gc.price AS graphics_card_price,
           m.price AS motherboard_price, r.price AS ram_price
    FROM builds b
    JOIN processors p ON b.id = p.id
    JOIN power_supplies ps ON b.id = ps.id
    JOIN storage s ON b.id = s.id
    JOIN cpu_coolers cc ON b.id = cc.id
    JOIN pc_cases pc ON b.id = pc.id
    JOIN graphics_cards gc ON b.id = gc.id
    JOIN motherboards m ON b.id = m.id
    JOIN ram r ON b.id = r.id`;

  db.query(sql, (err, results) => {
    if (err) throw err;

    const builds = results.map(build => {
      const totalPrice = build.build_price + build.processor_price + build.power_supply_price + build.storage_price +
        build.cpu_cooler_price + build.pc_case_price + build.graphics_card_price + build.motherboard_price + build.ram_price;
      const category = getBuildCategory(totalPrice);
      return { ...build, totalPrice, category };
    });

    res.json(builds);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
