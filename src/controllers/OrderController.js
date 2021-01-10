const Order = require("../models/Order");
const Session = require('./SessionController');

module.exports = {
  async create(req, res) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return res.status(401).json({ message: 'Missing Authorization Header' });
    }
    
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = Session.authenticate({ username, password });
    if (user) {
      const { name } = req.body;
      const { cardNumber } = req.body;
      const { document } = req.body;
      const { validDate } = req.body;
      const { securityCode } = req.body;
      const { products } = req.body;
      const { totalPrice } = req.body;
      try {
        order = await Order.create({ name, cardNumber, document, validDate, securityCode, products, totalPrice });
        return res.json(order);
      } catch (error) {
          res.status(400).json({ error: error });
      }
    } else {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
  }
};
