import { app } from "./app";
import { databaseConnect } from "./config";

const PORT = process.env.PORT || 3000; // fallback to 3000 PORT.

// only start the server if database is connected successfully
const startServer = async () => {
  try {
    await databaseConnect();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while connecting to database" + error);
    process.exit(1);
  }
};

startServer();