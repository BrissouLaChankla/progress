import mongoose from "mongoose";

const eatSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  dateEaten: {
    type: Date,
    default: Date.now,
  },
  grams: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

export default mongoose.models.Eat || mongoose.model("Eat", eatSchema);
