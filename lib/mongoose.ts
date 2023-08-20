import momgoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  momgoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log('MONFODB_URL is not found');
  if (isConnected) return console.log('Already connected to MongoDB');

  try {
    await momgoose.connect(process.env.MONGODB_URL);
    isConnected = true;

    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
