import chalk from "chalk";
import createServer from "./app";

import { connectDatabase } from "./config/database.config";

let port = 9001;

const app = createServer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (!process.env?.TEST) {
  connectDatabase();
}

app.listen(port, async () => {
  console.log(chalk.bgCyan(`Server is running on port ${port} 🚀`));
});
