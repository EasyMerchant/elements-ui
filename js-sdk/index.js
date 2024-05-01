(function () {
  const allMethods = document.querySelectorAll(".method-card");
  const allFields = document.querySelectorAll(".fields");
  const tnc = document.querySelector("#tnc");
  const modal = document.querySelector("#modal");
  const closeModal = document.querySelector("#close");
  const mainBtn = document.querySelector("#pay-now-main");
  const payNowBtn = document.querySelectorAll(".pay-now");
  const payForm = document.querySelector("#pay-section");
  const loader = document.querySelector("#loader");
  const doneSection = document.querySelector("#done-section");
  const cryptoPay = document.querySelector("#crypto-pay");
  const timeout = document.querySelector("#timeout");
  const countdownElement = document.getElementById("countdown");
  const restartBtn = document.querySelector("#restart-timer");
  const qrImages = document.querySelectorAll(".qr-img");
  const qrBtns = document.querySelectorAll(".qr-type-btn");
  const radioButtons = document.querySelectorAll('input[name="method"]');
  let countdownStarted = false;
  let timer;

  allFields[0].style.display = "flex";

  mainBtn?.addEventListener("click", () => {
    payForm?.classList.remove("hidden");
    mainBtn?.classList.add("hidden");
  });

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

    if (method === "crypto" && !countdownStarted) {
      startCountDown();
    }
  }

  function activeCryptoBtn(element) {
    element?.classList.add(
      "bg-primary-300",
      "hover:bg-primary-200",
      "text-white"
    );
    element?.classList.remove(
      "bg-white",
      "hover:bg-primary-200",
      "hover:text-white"
    );
  }

  function removeActiveCrypto() {
    qrBtns?.forEach((btn) => {
      btn?.classList.remove(
        "bg-primary-300",
        "hover:bg-primary-200",
        "text-white"
      );
      btn?.classList.add(
        "bg-white",
        "hover:bg-primary-200",
        "hover:text-white"
      );
    });
  }

  allMethods?.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.add("selected");
      removeActive(element.dataset?.method, allMethods, "selected");
      renderFields(element.dataset?.method);
    });
  });

  tnc?.addEventListener("click", (e) => {
    modal.classList.remove("hidden");
  });

  closeModal?.addEventListener("click", (e) => {
    modal.classList.add("hidden");
  });

  payNowBtn?.forEach((btn) => {
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      payForm?.classList.add("hidden");
      loader?.classList?.remove("hidden");
      setTimeout(() => {
        loader?.classList?.add("hidden");
        doneSection?.classList?.remove("hidden");
      }, 3000);
    });
  });

  restartBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    timeout?.classList?.add("hidden");
    cryptoPay?.classList.remove("hidden");
    countdownElement.innerHTML = timer;
    startCountDown();
  });

  qrBtns?.forEach((qr) => {
    qr?.addEventListener("click", (e) => {
      e.preventDefault();
      removeActiveCrypto();
      activeCryptoBtn(qr);
      const qrType = qr.dataset.qr;
      qrImages.forEach((img) => {
        if (qrType == img.dataset.qr) {
          img.classList?.remove("hidden");
        } else {
          img.classList?.add("hidden");
        }
      });
    });
  });

  // Countdown on Crypto Section.
  function startCountDown() {
    countdownStarted = true;

    timer = countdownElement.innerHTML;
    // Split the time string into minutes and seconds
    const timeParts = countdownElement.innerHTML.split(":");
    let minutes = parseInt(timeParts[0]);
    let seconds = parseInt(timeParts[1]);

    // Calculate the total seconds
    let totalSeconds = minutes * 60 + seconds;

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
      // Update minutes and seconds
      minutes = Math.floor(totalSeconds / 60);
      seconds = totalSeconds % 60;

      // Display the updated time
      countdownElement.innerHTML =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

      // Decrement total seconds
      totalSeconds--;

      // If the countdown is finished, clear the interval
      if (totalSeconds < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Time's up!";
        timeout?.classList?.remove("hidden");
        cryptoPay?.classList.add("hidden");
      }
    }, 1000);
  }

  // Wallet section

  // Attach event listener to each radio button
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      // Hide all divs
      document.querySelectorAll("button[data-wallet]").forEach(function (btn) {
        btn.classList?.add("hidden");
      });

      // Show the corresponding div based on the selected radio button value
      const selectedValue = this.value;
      document
        .querySelector('button[data-wallet="' + selectedValue + '"]')
        .classList.remove("hidden");
    });
  });
})();
