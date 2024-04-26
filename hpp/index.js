(function () {
  const steps = document.querySelectorAll(".step");
  const allFields = document.querySelectorAll(".fields");

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
})();
