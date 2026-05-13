const bcrypt = require("bcrypt");
const User = require("../models/User");

const TEST_ADMIN = {
  name: "Test Admin",
  email: "chanthesmoker@gmail.com",
  password: "movisuals22x",
};

const ensureTestAdmin = async () => {
  const existingUser = await User.findOne({ email: TEST_ADMIN.email });
  const hashedPassword = await bcrypt.hash(TEST_ADMIN.password, 10);

  if (!existingUser) {
    await User.create({
      name: TEST_ADMIN.name,
      email: TEST_ADMIN.email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Test admin account created");
    return;
  }

  existingUser.name = TEST_ADMIN.name;
  existingUser.password = hashedPassword;
  existingUser.role = "admin";
  await existingUser.save();

  console.log("Test admin account updated");
};

module.exports = ensureTestAdmin;