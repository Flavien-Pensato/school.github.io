import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "La tâche n'a pas de nom."],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
