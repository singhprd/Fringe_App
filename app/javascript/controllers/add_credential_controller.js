import { Controller } from "stimulus"
import * as Credential from "credential";
import * as Encoder from "encoder";

export default class extends Controller {
  create(event) {
    // var [data, status, xhr] = event.detail;
    var credentialOptions = data;

    credentialOptions["challenge"] = Encoder.strToBin(credentialOptions["challenge"]);
    credentialOptions["user"]["id"] = Encoder.strToBin(credentialOptions["user"]["id"]);
    var email = event.target.querySelector("input[name='webauthn[email]']").value;
    var callback_url = `/credentials/callback?email=${email}`

    Credential.create(encodeURI(callback_url), credentialOptions);
  }

  test() {
    alert("hello")
  }
}
