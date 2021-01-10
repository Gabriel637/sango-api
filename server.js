const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes");

const app = express();
const server = http.Server(app);
// Fazendo conexão com o banco de dados mongodb na nuvem
mongoose.connect(
  "mongodb+srv://admin:a1rdclevnfsocl@cafesango.diaen.mongodb.net/project0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, 'uploads')))
app.use(routes);

app.listen(process.env.PORT || 3333, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});