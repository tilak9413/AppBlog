import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  disc: {
    type: String,
    required: true,
  },
  // Optional: you can add image or button text
  image: {
    type: String,
  },
  buttonText: {
    type: String,
  },
}, { timestamps: true });

// Avoid recompiling model in Next.js hot reload
const Hero = mongoose.models.Hero || mongoose.model("Hero", HeroSchema);

export default Hero;
