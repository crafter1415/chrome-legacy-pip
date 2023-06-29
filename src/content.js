var clicked = null;

function setClicked(target) {
  console.log(target);
  if (clicked != null)
    clicked.classList.remove('clp\\pip-target');
  clicked = target;
  if (clicked != null)
    clicked.classList.add('clp\\pip-target');
}

document.addEventListener("contextmenu", (event)=>{
  setClicked(event.target);
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  if (request === "resetClickedEl") {
    setClicked(null);
    sendResponse();
  }
});
