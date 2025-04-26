import * as dotenv from "dotenv";
import express from 'express';
dotenv.config();
import AppRouter from "./routes/app.routes";
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/app", AppRouter);

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
