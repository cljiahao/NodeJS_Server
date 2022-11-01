let express = require("express");
let app = express();
let router = express.Router();

router.get("/message/:id", function (req, res, next) {
    console.log(typeof req.params.id);
    if (req.params.id === 1 + "") {
        console.log("the current id is 1");
        next();
    } else if (req.params.id === 2 + "") {
        console.log("the current id is 2");
        next("route");
    } else if (req.params.id === 3 + "") {
        console.log("the current id is 3");
        next("router");
    } else {
        res.send("no id matched");
    }
}, function (req, res) {
    res.send("this is a scenario when id is 1");
});

router.get("/message/:id", function (req, res) {
    res.send("this is a details page");
});


app.use("/", router, function (req, res) {
    res.send("this is triggered by the app");
});

app.listen(8080, function () {
    console.log("Please visit localhost:8080");
});