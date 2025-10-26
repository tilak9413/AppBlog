// models/Service.js
import mongoose from "mongoose";

// Service Card Schema (embedded document)
const ServiceCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 }
});

// Service Card Section Schema (embedded document)
const ServiceCardSectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  order: { type: Number, default: 0 },
  cards: [ServiceCardSchema]
});

// Service Category Schema
const ServiceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, unique: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

// Generate slug before saving
ServiceCategorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();
  }
  next();
});

// Main Service Schema
const ServiceSchema = new mongoose.Schema({
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ServiceCategory',
    required: true 
  },
  slug: { type: String, unique: true },
  heroSection: {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  cardSections: [ServiceCardSectionSchema],
  content: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Generate slug before saving
ServiceSchema.pre('save', function(next) {
  if (this.isModified('heroSection.title')) {
    this.slug = this.heroSection?.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();
  }
  next();
});

export const ServiceCategory = mongoose.models.ServiceCategory || 
  mongoose.model("ServiceCategory", ServiceCategorySchema);

export const Service = mongoose.models.Service || 
  mongoose.model("Service", ServiceSchema);