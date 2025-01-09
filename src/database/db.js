import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/musicApp';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB on localhost'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

export default mongoose.connection;

