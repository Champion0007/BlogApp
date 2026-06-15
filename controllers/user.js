// const user = require("../models/user");

// async function handleUserSignUp(req, res) {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "all fields are required" });
//     }

//     await user.create({
//       name,
//       email,
//       password,
//     });

//     return res.status(200).json({ message: "User create successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }
