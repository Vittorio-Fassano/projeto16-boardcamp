import dotenv from "dotenv";
import app from "./index.js";

dotenv.config();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));
