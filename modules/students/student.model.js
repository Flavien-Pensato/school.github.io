import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const StudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Il manque un nom à l’éléve.'],
  },
  classe: {
    type: String,
    required: [true, 'Aucune classe pour cet éléve !'],
  },
  groupe: {
    type: Number,
  },
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
