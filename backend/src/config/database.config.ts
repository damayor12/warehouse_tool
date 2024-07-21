import chalk from "chalk";

import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  //**** Free db intentionally placed here for ease */
  mongoose
    .connect("mongodb+srv://admin:admin@cluster0.alt4rbs.mongodb.net/", { retryWrites: true, w: "majority" })
    .then((con) => {
      console.log(chalk.bgGreen("Connected to db 🚀"));
    });
};
