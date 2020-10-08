// JavaScript Document
function isMobil() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
  if (isMobile()) {
    如果是觸控螢幕的話， 需要做什麼....
  } else {
    function myFunction() {
      alert("I am an alert box!");
    }
  }
