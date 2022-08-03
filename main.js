//https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=265fd843193e525d938b8b994a7bd5db&units=metric

// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiakey = "265fd843193e525d938b8b994a7bd5db";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiakey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { main, name, weather, sys } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
    <h2 class='city-name' data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
                <img class='city-icon' src='${icon}' alt ='city' >
                <figurecaption>${weather[0]["description"]}</figurecaption>
            </figure> 
    `;
      li.innerHTML = markup;
      list.appendChild(li);
      msg.innertext = " ";
    })
    .catch(() => {
      msg.innertext = "search valid city";
    });
  input.value = " ";
});
