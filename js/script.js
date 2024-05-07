let input = document.getElementById("input");
let shortenBtn = document.getElementById("shorten");

shortenBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value === "") {
    document.getElementById("warning").innerHTML = "Please add a link";
  } else {
    shortenBtn.disabled = true;
    shortenBtn.textContent = "Processing...";

    setTimeout(() => {
      let shortenedURL = "https://reLink/k4Kyk";

      document.getElementById("shortened-output").innerHTML = shortenedURL;

      let shorteningURL = input.value;

      document.getElementById("output").innerHTML = shorteningURL;

      shortenBtn.disabled = false;
      shortenBtn.textContent = "Shorten it!";
      input.value = "";
      document.querySelector(".drop-box").classList.add("drop-box--show");

      document.getElementById("warning").innerHTML = "";
    }, 2000);
  }
});

let copyBtn = document.getElementById("copy");

copyBtn.addEventListener("click", () => {
  let textToCopy = document.getElementById("shortened-output");

  let range = document.createRange();
  range.selectNode(textToCopy);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand("copy");

  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
});
