const User = require("../models/User");
const crypto = require("crypto");

module.exports = {
  async create(req, res) {
    const { username } = req.body;
    const { password } = req.body;
    let user = await User.findOne({ username: username });

    if (!user) {
      try {
        const passwordHash = crypto
          .createHmac("sha256", password)
          .update("C both sides like Chanel")
          .digest("hex");

        user = await User.create({ username, passwordHash });
        return res.json(user);
      } catch (error) {
        res.status(400).json({ error: error });
      }
    } else {
      return res.status(409).json({ error: "Username is already taken" });
    }
  },

  async authenticate({ username, password, res }) {
    User.findOne({ username: username }).then(
        (user) => {
          if (!user) {
            return false
          }
          const passwordHash = crypto
          .createHmac("sha256", password)
          .update("C both sides like Chanel")
          .digest("hex");
            if (passwordHash === user.passwordHash) {
               return true
            } else{
                return false
            }
        }
      );
}
};
