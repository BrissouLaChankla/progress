import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  calories: {
    type: Number,
  },
  proteines: {
    type: Number,
  },
  glucides: {
    type: Number,
  },
  lipides: {
    type: Number,
  },
});

export default mongoose.models.Food || mongoose.model("Food", foodSchema);
