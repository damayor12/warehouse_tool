import LineItem from "../model/LineItem";
import Order from "../model/Order";
import Product from "../model/Product";
import { v4 as uuidV4 } from "uuid";
const fs = require("fs");
const path = require("path");
import { connectDatabase } from "../config/database.config";
import mongoose from "mongoose";

const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const seedProducts = async () => {
  connectDatabase();

  try {
    await Product.deleteMany();
    await LineItem.deleteMany();
    await Order.deleteMany();
    console.log("Products, LineItems and Orders are deleted");

    const orders = JSON.parse(fs.readFileSync(path.join(__dirname, "../orders.json")));

    /********** Simulating Order creation */
    const products = await Product.insertMany([
      { name: "Red Roses Bouquet", quantity: 100 },
      { name: "Box of chocolates", quantity: 100 },
      { name: "Love card", quantity: 100 },
      { name: "Women’s perfume", quantity: 100 },
      { name: "Birthday cupcake", quantity: 100 },
      { name: "$100 Visa Gift Card", quantity: 100 },
      { name: "Birthday card", quantity: 100 },
      { name: "Bottle of wine", quantity: 100 },
      { name: "Fruit basket", quantity: 100 },
      { name: "Pen", quantity: 100 },
    ]);

    console.log("Products Inserted");

    const lineItems = await LineItem.insertMany([
      {
        name: "Valentines Box",
        products: [
          {
            productId: products.find((p) => p.name === "Red Roses Bouquet")?._id || "0",
            quantity: 1,
          },
          {
            productId: products.find((p) => p.name === "Box of chocolates")?._id || "0",
            quantity: 1,
          },
          { productId: products.find((p) => p.name === "Love card")?._id || "0", quantity: 1 },
          { productId: products.find((p) => p.name === "Women’s perfume")?._id || "0", quantity: 1 },
        ],
      },
      {
        name: "Birthday Box",
        products: [
          { productId: products.find((p) => p.name === "Birthday cupcake")?._id || "0", quantity: 1 },
          {
            productId: products.find((p) => p.name === "$100 Visa Gift Card")?._id || "0",
            quantity: 1,
          },
          { productId: products.find((p) => p.name === "Birthday card")?._id || "0", quantity: 1 },
        ],
      },
      {
        name: "Client Gift Box",
        products: [
          { productId: products.find((p) => p.name === "Bottle of wine")?._id || "0", quantity: 1 },
          { productId: products.find((p) => p.name === "Fruit basket")?._id || "0", quantity: 1 },
          { productId: products.find((p) => p.name === "Pen")?._id || "0", quantity: 1 },
        ],
      },
    ]);

    await Order.insertMany(
      orders.map((item: any) => {
        return {
          order_date: new Date(),
          total: item.total,
          shipping_address: item.shipping_address,
          customer_email: item.customer_email,
          customer_name: item.customer_name,
          lineItems: shuffle(lineItems as Array<any>)
            .slice(0, Math.floor(Math.random() * 3) + 1)
            .map((item: any) => {
              const id = uuidV4();

              return { lineItemId: item._id, quantity: 1, name: item.name, order_product_id: id };
            }),
        };
      }),
    );

    console.log("Mock Orders Created!");

    mongoose.connection.close();

    process.exit();
  } catch (error: any) {
    console.error(error.message);
    process.exit();
  }
};

seedProducts();
