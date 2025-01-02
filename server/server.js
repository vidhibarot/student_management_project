const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors') 
require('dotenv').config();
require('./config/global');
const app = express();
const http = require('http');
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())
app.use('/student_management/images', express.static(__dirname + '/Assets/images'))

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

//response handler
app.use((req, res, next) => {
  const ResponseHandler = require('./config/response_handler')
  res.handler = new ResponseHandler(req, res);
  next()
})


try {
  const appRoutes = require('./routes')
  appRoutes(app)
} catch (error) {
  console.log("Route Crash -> ", error)
}


const PORT = process.env.PORT || 9000


server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
