import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL must be define');
  }

  if (!process.env.ACCESS_KEY_ID) {
    throw new Error('ACCESS_KEY_ID must be define');
  }

  if (!process.env.SECRET_ACCESS_KEY) {
    throw new Error('SECRET_ACCESS_KEY must be define');
  }

  if (!process.env.BUCKET_NAME) {
    throw new Error('BUCKET_NAME must be define');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be define');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be define');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be define');
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to Mongodb');
  } catch (err) {
    throw new Error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
