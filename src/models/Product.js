const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
},
{
  toJSON:{
    virtuals: true
},
});


ProductSchema.virtual('image_url').get(function (){
  return `https://sango-api.herokuapp.com/files/${this.image}`
});

module.exports = mongoose.model("Product", ProductSchema);
