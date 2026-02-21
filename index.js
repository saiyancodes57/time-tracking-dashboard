const buttons = document.querySelectorAll(".time-options button");
const timeValues = document.querySelectorAll(".time-period");
const hourValues = document.querySelectorAll(".hours");

let jsonData;
let timeValue = "weekly";

fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      return console.log("Oops! Something went wrong.");
    }
    return response.json();
  })
  .then((data) => {
    jsonData = data;
  });

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("selected"));
    this.classList.add("selected");
    timeValue = this.dataset.time;

    if (!jsonData) return; // Safety check

    // 2. Set the text label based on timeframe
    const labels = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month",
    };

    jsonData.forEach((item, i) => {
      hourValues[i].textContent = `${item.timeframes[timeValue].current}hrs`;
      timeValues[i].textContent =
        `${labels[timeValue]} - ${item.timeframes[timeValue].previous}hrs`;
    });
  });
});
