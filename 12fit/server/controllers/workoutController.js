const generateWorkoutPlan = ({ age, weight, height, activity, goal, diet }) => {
  if (goal === "Lose Weight") {
    if (
      activity === "Sedentary" ||
      activity === "Sedentary (little to no exercise)"
    ) {
      return [
        "Jumping Jacks - 20 reps",
        "Bodyweight Squats - 15 reps",
        "Walking - 20 min",
        "Plank - 20 sec",
      ];
    }

    if (activity === "Moderate") {
      return [
        "Brisk Walking - 25 min",
        "Lunges - 15 reps",
        "Mountain Climbers - 20 sec",
        "Plank - 30 sec",
      ];
    }

    return [
      "Running - 20 min",
      "Burpees - 15 reps",
      "Lunges - 20 reps",
      "Mountain Climbers - 30 sec",
    ];
  }

  if (goal === "Gain Muscle") {
    if (
      activity === "Sedentary" ||
      activity === "Sedentary (little to no exercise)"
    ) {
      return [
        "Push-ups - 10 reps",
        "Bodyweight Squats - 15 reps",
        "Plank - 30 sec",
        "Glute Bridges - 12 reps",
      ];
    }

    if (activity === "Moderate") {
      return [
        "Push-ups - 15 reps",
        "Dumbbell Squats - 12 reps",
        "Shoulder Press - 10 reps",
        "Plank - 40 sec",
      ];
    }

    return [
      "Bench Press - 10 reps",
      "Deadlift - 8 reps",
      "Pull-ups - 8 reps",
      "Shoulder Press - 10 reps",
    ];
  }

  return [
    "Stretching - 10 min",
    "Walking - 15 min",
    "Bodyweight Squats - 10 reps",
    "Plank - 20 sec",
  ];
};

const getWorkouts = (req, res) => {
  res.json({
    message: "Workout data will be implemented by the workout team member",
  });
};

const createWorkout = (req, res) => {
  const { age, weight, height, activity, goal, diet } = req.body;

  const workoutPlan = generateWorkoutPlan({
    age,
    weight,
    height,
    activity,
    goal,
    diet,
  });

  res.json({
    message: "Workout plan generated successfully",
    age,
    weight,
    height,
    activity,
    goal,
    diet,
    workoutPlan,
  });
};

const generateWorkout = (req, res) => {
  const { age, weight, height, activity, goal, diet } = req.body;

  const workoutPlan = generateWorkoutPlan({
    age,
    weight,
    height,
    activity,
    goal,
    diet,
  });

  res.json({
    message: "Workout plan generated successfully",
    age,
    weight,
    height,
    activity,
    goal,
    diet,
    workoutPlan,
  });
};

module.exports = {
  getWorkouts,
  createWorkout,
  generateWorkout,
};