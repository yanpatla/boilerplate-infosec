const express = require("express");
const app = express();
const helmet = require("helmet");
let ninetyDaysInSeconds = 90*24*60*60;

app.use(helmet());
app.use(helmet.hidePoweredBy());//? PARA OCULTAR A LOS HACKERS QUE EL SERVIDOR FUNCIONA CON EXPRESS

app.use(helmet.frameguard({action:'deny'}))//? PARA QUE NO PUEDAN INTRODUCIR IFRAMES MALICIOSOS Y QUE CUAND HAGAS CLICK NO TE REDIRIGA A OTRO LADO
app.use(helmet.xssFilter()) //? PARA SANITIZAR LAS REQUEST ADEMAS DE PASSWORD Y COOKIES
app.use(helmet.noSniff())//? PARA QUE EL NAVEGADOR NO OMITA EL CONTETN TYPE
app.use(helmet.ieNoOpen())//? PARA  INTERT EXPLORER(NO SE USA CASI)
app.use(helmet.hsts({maxAge:ninetyDaysInSeconds}))

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {

  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
