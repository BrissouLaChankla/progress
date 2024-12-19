import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    chess: Number,
    duolingo: Number,
    sport: Number,
    money: Number,
    lol: Number,
    date: Date,
});

export default mongoose.models.Data || mongoose.model("Data", DataSchema);