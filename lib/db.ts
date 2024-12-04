import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  // Pour verifier la connexion
  if (connectionState === 1) {
    console.log("Deja connecté");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(`${MONGO_URI}`, {
      dbName: "rest-api-mongo-protect",
      bufferCommands: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
