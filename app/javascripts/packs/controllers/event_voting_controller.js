import { Controller } from "stimulus"

export default class extends Controller {
  initialize() {
    this.log()
  }

  log() {
    console.log("hello")
  }
}