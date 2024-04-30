(function () {
  const steps = document.querySelectorAll(".step");
  const allFields = document.querySelectorAll(".fields");
  const continueBtn = document.querySelector("#continue-btn");
  const payNowBtn = document.querySelector("#pay-now");
  const payLaterBtn = document.querySelector("#pay-later");
  const payBtn = document.querySelector("#pay-btn");
  const billingCheckbox = document.querySelector("#billing-info");
  const addressField = document.querySelector("#address-details");
  const cardOnNameField = document.querySelector("#card-name");
  const mobileSummary = document.querySelector("#mobile-summary-card");
  const paySection = document.querySelector("#pay-section");
  const reviewSection = document.querySelector("#review-section");
  const header = document.querySelector("#header");
  const doneSection = document.querySelector("#done-section");
  const loader = document.querySelector("#loader");

  allFields[0].style.display = "flex";

  function removeActive(id) {
    console.log(id, "index");
    steps.forEach((el, index) => {
      const children = el.children;
      if (index === id) {
        children[0]?.classList.add("stroke-primary-300");
        children[1]?.classList.add("text-primary-300");
        children[2]?.classList.add("text-primary-300");
        children[0]?.classList.remove("stroke-light-300");
        children[1]?.classList.remove("text-light-300");
        children[2]?.classList.remove("text-light-300");
      } else {
        children[0]?.classList.remove("stroke-primary-300");
        children[1]?.classList.remove("text-primary-300");
        children[2]?.classList.remove("text-primary-300");
        children[0]?.classList.add("stroke-light-300");
        children[1]?.classList.add("text-light-300");
        children[2]?.classList.add("text-light-300");
      }
    });
  }

  function renderFields(name) {
    allFields.forEach((el) => {
      if (el.dataset.name === name) {
        el.style.display = "flex";
      } else {
        el.style.display = "none";
      }
    });
  }

  steps.forEach((el, index) => {
    el.addEventListener("click", () => {
      removeActive(index);
      renderFields(el.dataset.name);
    });
  });

  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeActive(1);
    renderFields("payment");
  });

  payNowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeActive(2);
    reviewSection?.classList?.remove("hidden");
    paySection?.classList?.add("hidden");
    mobileSummary?.classList?.add("hidden");
    console.log("Paynow clicked");
  });

  payLaterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Paylater clicked");
  });

  payBtn.addEventListener("click", (e) => {
    e.preventDefault();
    reviewSection?.classList?.add("hidden");
    loader?.classList?.remove("hidden");
    header?.classList?.add("hidden");
    setTimeout(() => {
      loader?.classList?.add("hidden");
      doneSection?.classList?.remove("hidden");
    }, 3000);
    console.log("paybtn clicked");
  });

  billingCheckbox.addEventListener("change", (e) => {
    const value = e.target?.checked;
    if (value) {
      cardOnNameField.style.display = "none";
      addressField.style.display = "none";
    } else {
      cardOnNameField.style.display = "flex";
      addressField.style.display = "flex";
    }
  });
})();
