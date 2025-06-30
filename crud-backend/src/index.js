import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";

const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT para deploy

app.use(cors());
app.use(express.json());

app.use("/api", clientRoutes);

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro para depuração
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
