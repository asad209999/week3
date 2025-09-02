import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import { dbConnection } from "./Database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import { createOnlineOrder } from "./src/modules/order/order.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));

// Webhook route (Stripe)
app.post("/webhook", express.raw({ type: "application/json" }), createOnlineOrder);

// Bootstrap modules + connect DB
bootstrap(app);
dbConnection();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
