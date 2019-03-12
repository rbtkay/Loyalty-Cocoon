exports.verify = (req, res) => {
    var username = '';
    if (req.session.username != '') {
        username = req.session.username;
    } else {
        // res.redirect("signin");
    }
    // res.send(username);
}
