module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to project");
    });

    // user routes
    app.use("/user", require("./users"));

    // Student routes
    app.use("/student", require("./students"));

    // fees routes
    app.use("/fees", require("./fees"));

    
}