import { Application } from "stimulus"
import { autoload } from "stimulus/webpack-helpers"

// Look for controllers inside app/javascripts/packs/controllers/
const application = Application.start()
const controllers = require.context("./controllers", true, /\.js$/)
autoload(controllers, application)