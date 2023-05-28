const express = require("express");
const bodyParser = require("body-parser");
const user = require("./validateUser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let activeUser = {};
let hasAccess = false;

//#region homePage
app.get("/", function (req, res) {
    res.render('home');
});

app.post("/", function (req, res) {
    const userDecision = req.body;

    if (userDecision.value == 'signIn') {
        res.redirect('/logIn');
    }
    else if (userDecision.value == 'signUp') {
        res.redirect('/signUp');
    }
});
//#endregion

//#region signUpPage
app.get("/signUp", function (req, res) {
    res.render('signUp');
});

app.post("/signUp", function (req, res) {
    const userDecision = req.body;
    let currentUser = {};

    if (userDecision.value == 'goHome') {
        res.redirect('/');
    }
    else if (userDecision.value == 'logIn') {
        res.redirect('/logIn');
    }
    else if (userDecision.value == 'create') {
        console.log(userDecision);
        currentUser = {
            userName: userDecision.userName,
            email: userDecision.email,
            pass: userDecision.pass
        }

        user.CreateUser(currentUser);

        res.redirect('/logIn');
    }
});
//#endregion

//#region logInPage

app.get("/logIn", function (req, res) {
    res.render('logIn');
});

app.post('/logIn', function (req, res) {
    const userDecision = req.body;
    if (userDecision.value == 'logIn') {
        hasAccess = user.CheckUser(userDecision);

        if (hasAccess) {
            console.log("Success");
            activeUser = user.GetActiveUser();
            res.redirect('/main');
        } else {
            console.log('error');
        }
    }
    else if (userDecision.value == 'goHome') {
        res.redirect('/');
    }
    else if (userDecision.value == 'signUp') {
        res.redirect('/signUp');
    }
});

//#endregion

//#region mainPage
app.get("/main", function (req, res) {
    if (hasAccess) {
        res.render('main', {
            hasAccess: hasAccess,
            userName: activeUser.userName
        })
    } else {
        res.render('main', {
            hasAccess: hasAccess,
        })
    }
});

app.post("/main", function (req, res) {
    var userDecision = req.body;

    if (userDecision.value == 'goHome') {
        res.redirect("/");
    } else if (userDecision.value == 'logOut') {
        hasAccess = false;
        res.redirect("/logIn");
    }

});

//#endregion

app.listen(3000, function () {
    console.log("listening on port 3000");
});