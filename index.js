(function () {
  console.log("first");
  const allMethods = document.querySelectorAll(".method-card");
  const allFields = document.querySelectorAll(".fields");
  allFields[0].style.display = "flex";

  function removeActive(name, items, className) {
    items.forEach((el) => {
      if (el?.dataset?.method !== name) {
        el.classList.remove(className);
      }
    });
  }

  function renderFields(method) {
    allFields.forEach((el) => {
      if (el.dataset.method === method) {
        el.style.display = "flex";
      } else {
        el.style.display = "none";
      }
    });
  }
  allMethods.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.add("selected");
      removeActive(element.dataset?.method, allMethods, "selected");
      renderFields(element.dataset?.method);
    });
  });
})();
