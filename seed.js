const { Category } = require("./models/Category");
const { Food } = require("./models/Food");
const mongoose = require("mongoose");

const data = [
  {
    name: "Fruit",
    foods: [
      { name: "Apple", numberInStock: 5, price: 2 },
      { name: "Banana", numberInStock: 10, price: 2 },
      { name: "Orange", numberInStock: 15, price: 2 },
    ],
  },
  {
    name: "Snacks",
    foods: [
      { name: "Chips", numberInStock: 5, price: 2 },
      { name: "Cookies", numberInStock: 10, price: 2 },
      { name: "Muffins", numberInStock: 15, price: 2 },
    ],
  },
  {
    name: "Vegetables",
    foods: [
      { name: "Carrot", numberInStock: 5, price: 2 },
      { name: "Cucumber", numberInStock: 10, price: 2 },
      { name: "Sallad", numberInStock: 15, price: 2 },
    ],
  },
];

async function seed() {
  await mongoose.connect("mongodb://localhost/intensive-foods");

  await Food.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({
      name: category.name,
    }).save();
    const foods = category.foods.map((food) => ({
      ...food,
      category: { _id: categoryId, name: category.name },
    }));
    await Food.insertMany(foods);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
