const users = [];
let activeUser = {};

exports.CheckUser = function (currentUser) {
    let canRedirect = false;

    users.forEach(function (user) {
        if (currentUser == undefined)
            return canRedirect;

        if (user.userName == currentUser.userName) {
            if (user.pass == currentUser.pass) {
                activeUser = user;
                canRedirect = true;
            } else {
                console.log("Incorrect Pass");
            }
        } else {
            console.log("No Access");
        }
    });

    return canRedirect;
}

exports.GetActiveUser = function () {
    return activeUser;
}

exports.CreateUser = function (user) {
    users.push(user);
}