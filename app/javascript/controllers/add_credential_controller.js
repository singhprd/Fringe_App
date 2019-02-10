import { Controller } from "stimulus"
import * as Credential from "credential";
import * as Encoder from "encoder";

export default class extends Controller {
  create(event) {
    // var [data, status, xhr] = event.detail;

    fetch("/webauthn/registrations", {
      method: "POST",
      // body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
      },
      credentials: 'same-origin'
    }).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
        alert(data.to_s);
      })
      // window.location.replace("/")
    });

    // var credentialOptions = data;

    // credentialOptions["challenge"] = Encoder.strToBin(credentialOptions["challenge"]);
    // credentialOptions["user"]["id"] = Encoder.strToBin(credentialOptions["user"]["id"]);
    // var email = event.target.querySelector("input[name='webauthn[email]']").value;
    // var callback_url = `/credentials/callback?email=${email}`

    // Credential.create(encodeURI(callback_url), credentialOptions);
  }

  test() {
    alert("hello")
  }
}
