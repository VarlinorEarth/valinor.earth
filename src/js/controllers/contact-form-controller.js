import { Controller } from "stimulus";

const submitDisableClass = "opacity-50";

export default class extends Controller {
  static targets = ["form", "successMessage", "failureMessage", "submit"];

  send(e) {
    e.preventDefault();
    if (!this.submitUrl) return;

    this.disableForm();
    const data = new FormData(this.formTarget);

    fetch(this.submitUrl, {
      method: "POST",
      mode: "no-cors",
      body: data,
    })
      .then(d => {
        this.successMessageTarget.classList.remove("hidden");
        this.formTarget.reset();
        this.enableForm();
      })
      .catch(e => {
        this.enableForm();
        this.failureMessageTarget.classList.remove("hidden");
      });
  }

  disableForm() {
    this.submitTarget.disabled = true;
    this.formTarget.classList.add(submitDisableClass);
  }

  enableForm() {
    this.submitTarget.disabled = false;
    this.formTarget.classList.remove(submitDisableClass);
  }

  get submitUrl() {
    return this.data.get("url");
  }
}