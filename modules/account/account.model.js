import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  hash: {
    type: String,
  },
});

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);
