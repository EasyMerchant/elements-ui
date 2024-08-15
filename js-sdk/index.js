(function () {
  const allMethods = document.querySelectorAll(".method-card");
  const paymentmethod = document.querySelector(".payment-method");
  const savecard = document.querySelector("#save-card");
  const enterdetails = document.querySelector("#enter-details");
  const getotp = document.querySelector("#get-otp");
  const enterotp = document.querySelector("#enter-otp");
  const cardspage = document.querySelector("#cards-page");
  const changecard = document.querySelector("#change-card");
  const cardoption = document.querySelector("#card-option");
  const options = document.querySelectorAll(".option");
  const updatecard = document.querySelector("#update-card");
  const updatecarddetails = document.querySelector("#update-card-details");
  const carddetail = document.querySelector("#card-details");
  const newcard = document.querySelector("#new-card");
  const newcarddetails = document.querySelector("#new-card-details");
  const addressdata = document.querySelector("#address-data");
  const addressdetails = document.querySelector("#address-details");
  const backcarddetails = document.querySelector("#back-card-details");
  const ownersdata = document.querySelector("#owners-data");
  const cardownerdetails = document.querySelector("#card-owner-details");
  const backaddressdetails = document.querySelector("#back-address-details");
  const paysectionform = document.querySelector("#pay-section-form");
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
        className.forEach(element => {
          el.classList.remove(element);
        });
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
      element.classList.add("selected", 'border-primary-300',"font-semibold","text-light-500","!stroke-primary-300" ,"!fill-primary-300");
      removeActive(element.dataset?.method, allMethods, ["selected", "border-primary-300","font-semibold","text-light-500","!stroke-primary-300","!fill-primary-300"] );
      renderFields(element.dataset?.method);
    });
  });

  tnc?.addEventListener("click", (e) => {
    modal.classList.remove("hidden");
  });

  closeModal?.addEventListener("click", (e) => {
    modal.classList.add("hidden");
  });

  savecard?.addEventListener("click", (e)=>{
    e.preventDefault();
    paysectionform?.classList.add("hidden");
    enterdetails?.classList.remove("hidden");
  })

  getotp?.addEventListener("click", (e)=>{
    e.preventDefault();
    // paysectionform?.classList.add("hidden");
    enterdetails?.classList.add("hidden");
    enterotp?.classList.remove("hidden");
  })
  
  addressdata?.addEventListener("click", (e)=>{
    e.preventDefault();
    paymentmethod?.classList.add("hidden");
    carddetail?.classList.add("hidden");
    addressdetails?.classList.remove("hidden");
  })

  backcarddetails?.addEventListener("click", (e)=>{
    e.preventDefault();
    paymentmethod?.classList.remove("hidden");
    carddetail?.classList.remove("hidden");
    addressdetails?.classList.add("hidden");
  })

  ownersdata?.addEventListener("click", (e)=>{
    e.preventDefault();
    addressdetails?.classList.add("hidden");
    cardownerdetails?.classList.remove("hidden");
  })

  backaddressdetails?.addEventListener("click", (e)=>{
    e.preventDefault();
    addressdetails?.classList.remove("hidden");
    cardownerdetails?.classList.add("hidden");
  })

  changecard?.addEventListener("click", (e)=>{
    e.preventDefault();
    enterotp?.classList.add("hidden");
    cardoption?.classList.remove('hidden');
    cardspage?.classList.add("hidden");
  })

  options?.forEach(option => {
    option.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Get the next sibling element (which is the corresponding option-data)
        const correspondingOptionData = option.previousElementSibling;
        
        if (correspondingOptionData) {
            correspondingOptionData.classList.toggle('hidden');
        } else {
            console.error('No corresponding option-data found');
        }
    });
});


  // options?.addEventListener("click", (e)=>{
  //   e.preventDefault();
  //   optiondata?.classList.remove("hidden");
  // })

  updatecard?.addEventListener("click", (e)=>{
    e.preventDefault();
    updatecarddetails?.classList.remove("hidden");
    cardoption?.classList.add("hidden");
  })

  newcard?.addEventListener("click", (e)=>{
    e.preventDefault();
    newcarddetails?.classList.remove("hidden");
    cardoption?.classList.add("hidden");
  })

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


let digitValidate = function(ele){
  console.log(ele.value);
  ele.value = ele.value.replace(/[^0-9]/g, '');
  if (ele.value !== '') {
    ele.style.backgroundColor = "#0000000a"; 
    ele.style.fontColor="#000000 !important" // Change to your desired color
  } else {
    ele.style.backgroundColor = "";
    ele.style.fontColor=""  // Reset background color if input is empty
  }
}

let tabChange = function(val){
    let ele = document.querySelectorAll('.otp');
    if(ele[val-1].value != ''){
      ele[val].focus();
    }else if(ele[val-1].value == ''){
      ele[val-2].focus();
    }   
}


 var timeLimitInMinutes = 3;
var timeLimitInSeconds = timeLimitInMinutes * 60;
var timerElement = document.getElementById('timer');

function startTimer() {
  timeLimitInSeconds--;
  var minutes = Math.floor(timeLimitInSeconds / 60);
  var seconds = timeLimitInSeconds % 60;

  if (timeLimitInSeconds < 0) {
    timerElement.textContent = '00:00';
    clearInterval(timerInterval);
    return;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  timerElement.textContent = minutes + ':' + seconds;
}

var timerInterval = setInterval(startTimer, 1000);

var btn = document.querySelector("#setting-menu");
var setting = document.querySelector("#setting");
var closesetting = document.querySelector("#close-setting");
var overlay = document.querySelector("#overlay");

function toggleModal() {
  closesetting.addEventListener("click", (e) => {
    e.preventDefault();
    setting.style.transition = "opacity 0.3s ease-in-out, bottom 0.3s ease-in-out"; // Add transitions
    setting.style.opacity = "0"; // Fade out the modal
    setting.style.pointerEvents = "none"; // Disable pointer events during transition
    setting.style.bottom = '-27%'; // Slide modal downwards

    overlay.style.opacity = "0"; // Fade out the overlay

    setTimeout(() => {
      setting.style.display = "none"; // Hide the modal after the transition
      setting.style.opacity = "1"; // Reset opacity
      setting.style.pointerEvents = "auto"; // Re-enable pointer events
      setting.style.bottom = '7%'; // Reset modal position

      overlay.style.display = "none"; // Hide the overlay
    }, 300); // Match the timeout with the transition duration
  });

  if (setting.style.display === "block") {
    // Logic to handle when the modal is already open
  } else {
    setting.style.display = "block";
    overlay.style.display = "block"; // Show the overlay
    overlay.style.opacity = "1"; // Fade in the overlay

    setting.style.transition = "opacity 0.3s ease-in-out, bottom 0.3s ease-in-out"; // Add transitions
    setting.style.opacity = "0"; // Start with zero opacity
    setting.style.pointerEvents = "none"; // Disable pointer events during transition
    setting.style.bottom = '0px'; // Slide modal upwards

    setTimeout(() => {
      setting.style.opacity = "1"; // Fade in the modal
      setting.style.pointerEvents = "auto"; // Re-enable pointer events
      setting.style.bottom = '7%'; // Reset modal position
      setting.style.left = '27.75%';
    }, 100);
  }
}

// When the user clicks the button, toggle the modal
btn.onclick = function () {
  toggleModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == setting) {
    setting.style.display = "none";
    overlay.style.display = "none";
  }
};

function selectImage(imageSrc, name, price,  event) {
  // Select the target div
  const targetDiv = document.getElementById('targetDiv');
  
  // Clear the target div and set new image and name
 price,  targetDiv.innerHTML = `
  <div class="flex justify-between w-full items-center">
  <div class="flex gap-3 items-center">
    <img src="${imageSrc}" alt="Selected Image" class="w-8 h-8 rounded-lg">
    <p class="text-sm leading-5 font-inter text-light-500">${name}</p></div>
    <p class="text-sm leading-16-94 font-inter text-light-500">${price}</p></div>
  `;

  // Remove border from all images
  document.querySelectorAll('.border-black').forEach(div => {
    div.classList.remove('border-black');
    div.classList.add('border-transparent');
  });

  // Add black border to the clicked image
  event.currentTarget.classList.remove('border-transparent');
  event.currentTarget.classList.add('border-black');
  
  // Remove the specific paragraph
  const paragraph = document.querySelector('.font-inter.text-xs.leading-4.text-light-400');
  if (paragraph) {
    paragraph.remove();
  }
}


// SVG icon as a string
const svgIcon = `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 10.2008L0 6.20078L1.4 4.80078L4 7.40078L10.6 0.800781L12 2.20078L4 10.2008Z" fill="#1757D9"/>
</svg>`;

// Open the popup when "Choose" is clicked
document.getElementById('chooseBtn').addEventListener('click', function () {
    document.getElementById('popup').classList.remove('hidden');
});

// Close the popup
document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('popup').classList.add('hidden');
});

// Select a cause
document.querySelectorAll('.select-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        // Mark the current button as selected and add the SVG
        btn.setAttribute('data-select', 'true');
        btn.innerHTML = svgIcon + ' Selected'; // Add SVG icon before the "Selected" text
        btn.classList.add('text-blue-800');
    });
});

// Update the selected cause when "Done" is clicked
document.getElementById('doneBtn').addEventListener('click', function () {
    const selectedCause = document.querySelector('.select-btn[data-selected="true"]');
    if (selectedCause) {
        // Get the selected cause details
        const causeName = selectedCause.closest('li').querySelector('strong').innerText;
        const causeImage = selectedCause.closest('li').querySelector('img').src;
        const causeAmount = selectedCause.closest('li').getAttribute('data-amount');  // Get the dynamic amount

        // Update the displayed cause information
        document.getElementById('selectedImage').src = causeImage;
        document.getElementById('selectedName').innerText = causeName;
        document.getElementById('selectedAmount').innerText = causeAmount;
    }
    // Hide the popup after selection
    document.getElementById('popup').classList.add('hidden');
});

// Clear selections
document.getElementById('clearBtn').addEventListener('click', function () {
    document.querySelectorAll('.select-btn').forEach(function (button) {
        button.innerHTML = 'Select'; // Reset text to "Select"
        button.setAttribute('data-select', 'false');
        button.classList.remove('text-blue-800');
    });
});
