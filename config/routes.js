module.exports = function(router) {
    //The route for rendering homepage
    router.get("/", function(req, res) {
        res.render("home");
    });
    //The route for rendering saved page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });
}