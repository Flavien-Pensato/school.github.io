import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const WeekSchema = new mongoose.Schema({
  startAt: {
    type: Date,
    required: [true, "La tâche n'a pas de nom."],
  },
  endAt: {
    type: Date,
    required: [true, "La tâche n'a pas de nom."],
  },
  isHolliday: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Array,
    default: [],
  },
  tasks: {
    type: Object,
  },
});

export default mongoose.models.Week || mongoose.model('Week', WeekSchema);
