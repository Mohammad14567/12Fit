const generateDietPlan = (goal) => {
  if (goal === "lose weight") {
    return [
      "Breakfast: Oatmeal with banana",
      "Lunch: Grilled chicken salad",
      "Snack: Greek yogurt",
      "Dinner: Tuna with vegetables",
    ];
  }

  if (goal === "muscle gain") {
    return [
      "Breakfast: Eggs with toast",
      "Lunch: Rice with chicken breast",
      "Snack: Peanut butter sandwich",
      "Dinner: Steak with potatoes",
    ];
  }

  return [
    "Breakfast: Fruits and oatmeal",
    "Lunch: Rice and chicken",
    "Snack: Yogurt",
    "Dinner: Vegetables and grilled fish",
  ];
};

const getDietPlans = (req, res) => {
  res.json({
    message: "Diet data will be implemented by the diet team member",
  });
};

const createDietPlan = (req, res) => {
  const { goal } = req.body;

  const dietPlan = generateDietPlan(goal);

  res.json({
    message: "Diet plan generated successfully",
    goal,
    dietPlan,
  });
};

module.exports = {
  getDietPlans,
  createDietPlan,
};