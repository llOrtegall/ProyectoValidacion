import { connect } from "mongoose";
import "dotenv/config";

export const connectMongo = async ():Promise<void> => {
  const DB_URI = process.env.DB_URI;
  if (!DB_URI) {
    throw new Error("No se ha definido la variable de entorno DB_URI");
  }

  await connect(DB_URI);
}