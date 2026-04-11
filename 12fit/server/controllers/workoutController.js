const generateWorkoutPlan = (goal, level) => {
  if (goal === "lose weight") {
    if (level === "beginner") {
      return [
        "Jumping Jacks - 20 reps",
        "Bodyweight Squats - 15 reps",
        "Walking - 20 min",
        "Plank - 20 sec",
      ];
    }

    return [
      "Running - 20 min",
      "Burpees - 15 reps",
      "Lunges - 20 reps",
      "Mountain Climbers - 30 sec",
    ];
  }

  if (goal === "muscle gain") {
    if (level === "beginner") {
      return [
        "Push-ups - 10 reps",
        "Bodyweight Squats - 15 reps",
        "Plank - 30 sec",
        "Pull-ups Assisted - 5 reps",
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
  const { goal, level } = req.body;

  const workoutPlan = generateWorkoutPlan(goal, level);

  res.json({
    message: "Workout plan generated successfully",
    goal,
    level,
    workoutPlan,
  });
};

module.exports = {
  getWorkouts,
  createWorkout,
};