const passport = require("passport");
const routeDashboard = require("./route-dashboard");


module.exports = (app, passport) =>{
   routeDashboard(app, passport)
}