const mongoose = require("mongoose");
// Define the structure of a single meal inside the saved diet plan.

const mealSchema = new mongoose.Schema(
  {
    meal: { type: String, default: "" },
    calories: { type: Number, default: 0 },
    items: { type: [String], default: [] },
  },
  { _id: false }
);
// Define the structure of the calculated macronutrient values.

const macrosSchema = new mongoose.Schema(
  {
    protein: { type: String, default: "" },
    carbs: { type: String, default: "" },
    fats: { type: String, default: "" },
  },
  { _id: false }
);
// Diet model defines the full structure of the nutrition plan
// stored for each authenticated user in MongoDB.
const dietSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    name: { type: String, default: "" },
    age: { type: Number, default: null },
    weight: { type: Number, default: null },
    height: { type: Number, default: null },
    gender: { type: String, default: "" },
    fitnessLevel: { type: String, default: "" },
    activityLevel: { type: String, default: "" },
    goal: { type: String, default: "" },
    injuries: { type: String, default: "" },
    medicalConditions: { type: String, default: "" },
    dietaryRestrictions: { type: String, default: "" },
    preferredFoods: { type: String, default: "" },
    dislikedFoods: { type: String, default: "" },
    bmi: { type: Number, default: null },
    bmiCategory: { type: String, default: "" },
    bmr: { type: Number, default: null },
    tdee: { type: Number, default: null },
    targetCalories: { type: Number, default: null },
    macros: {
      type: macrosSchema,
      default: () => ({}),
    },
    plan: {
      type: [mealSchema],
      default: [],
    },
    notes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
// Reuse the existing model if it already exists to avoid recompilation errors.

module.exports = mongoose.models.Diet || mongoose.model("Diet", dietSchema);