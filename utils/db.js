import mongoose from 'mongoose';

const connection = {};

const dbConnect = async () => {
  /* check if we have connection to our databse */
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
