import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  features: {
    type: [String],
    default: [],
  },
  active: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

// Avoid recompiling model in Next.js hot reload
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;