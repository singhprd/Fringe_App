import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "content" ]

  initialize() {
    console.log("obj");
  }

  stopClose(e) {
    e.stopPropagation();
  }

  delete(e) {

    var stimulusController = this;

    let list_item_id = e.target.dataset.listItemId;

    $.ajax({
      type: "DELETE",
      url: "/list_items/" + list_item_id,
      context: this,
      success: (data) => {
        this.contentTarget.innerHTML = data;
      }
    });
  }

  click(e) {
    var stimulusController = this;

    let list_id = e.target.dataset.listId;
    let event_id = e.target.dataset.eventId;

    let data = {
      list_id: list_id,
      event_id: event_id
    }

    $.ajax({
      type: "POST",
      url: "/list_items",
      data: data,
      context: this,
      success: (data) => {
        this.contentTarget.innerHTML = data;
      }
    });
  }

  // handleResponse(data, textStatus, qjXHR) {
  //   debugger;
  // }
}


