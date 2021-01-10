const Product = require("../models/Product");
const Session = require('./SessionController');

module.exports = {
  async show(req, res) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return res.status(401).json({ message: 'Missing Authorization Header' });
    }
    
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = Session.authenticate({ username, password });
    if (user) {
      const products = await Product.find();
      return res.json(products); 
    } else {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
  },

  async create(req, res) {
    const { name } = req.body;
    const { price } = req.body;
    const { description } = req.body;
    const { filename } = req.file;
  
    try {
      product = await Product.create({ name, price, description, image: filename });
        return res.json(product);
      } catch (error) {
          res.status(400).json({ error: error });
      }
    },
};
