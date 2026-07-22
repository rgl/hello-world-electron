const helloButtonEl = document.getElementById("helloButton");
const ipAddressEl = document.getElementById("ipAddress");
const locationEl = document.getElementById("location");
const popupEl = document.getElementById("popup");

helloButtonEl.addEventListener("click", (e) => {
  fetch("https://ipinfo.io/json")
    .then((response) => response.json())
    .then((data) => {
      ipAddressEl.textContent = data.ip;
      locationEl.textContent = [
        data.city,
        data.region,
        data.country,
        data.org,
      ].filter((s) => s).join(", ");
      popupEl.style.display = "flex";
    });
});

popupEl.addEventListener("click", (e) => {
  popupEl.style.display = "none";
});
