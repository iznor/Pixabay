const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
app.use(express.json());
const { pixaRouter }  = require("./routers/pixaRouter");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.set('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api/pixa', pixaRouter);
router.use((req,res,next) =>{
  console.log("/", req.method);
  next();
});

router.get("/", (req,res) => {
  res.json({"message" : "Please use /api"});
});

app.listen(port, () => console.log('Express server is running on port', port));