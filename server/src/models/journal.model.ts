import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ambience: {
      type: String,
      enum: ["forest", "ocean", "mountain"],
    },
    text: {
      type: String,
      required: true,
    },
    emotion: String,
    keywords: [String],
    summary: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Journal", journalSchema);
