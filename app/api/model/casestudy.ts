import mongoose from "mongoose";

const caseStudy = new mongoose.Schema({
  title: { type: String, required: true },
  content :{type:String , require:true}
}, { timestamps: true });

// Correct: avoid reusing Hero model
export const caseStudyschema = mongoose.models.caseStudy || mongoose.model("caseStudy", caseStudy);