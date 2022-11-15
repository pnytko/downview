//AKTYWACJA WRAPPERA O MNIE
function DisplayWrapperAbout() {
  let popup = document.querySelector("#wrapper-about");

  if (popup.classList.contains("wrapper-visible") == false) {
    popup.classList.remove("wrapper-unvisible");
    popup.classList.add("wrapper-visible");
  }
}
function CloseWrapperAbout() {
  let popupdiv = document.querySelector("#wrapper-about");
  popupdiv.classList.remove("wrapper-visible");
  popupdiv.classList.add("wrapper-unvisible");
}

//AKTYWACJA WRAPPERA SZLAKI
function DisplayWrapperTrails() {
  let popup_trails = document.querySelector("#wrapper-trails");

  if (popup_trails.classList.contains("wrapper-visible") == false) {
    popup_trails.classList.remove("wrapper-unvisible");
    popup_trails.classList.add("wrapper-visible");
  }
}
function CloseWrapperTrails() {
  let popupdiv_trails = document.querySelector("#wrapper-trails");
  popupdiv_trails.classList.remove("wrapper-visible");
  popupdiv_trails.classList.add("wrapper-unvisible");
}

//AKTYWACJA WRAPPERA CUSTOMIZE YOUT TRAILS
function DisplayWrapperCustomize() {
  let popup_customize = document.querySelector("#wrapper-customize");

  if (popup_customize.classList.contains("wrapper-visible") == false) {
    popup_customize.classList.remove("wrapper-unvisible");
    popup_customize.classList.add("wrapper-visible");
  }
}
function CloseWrapperCustomize() {
  let popupdiv_customize = document.querySelector("#wrapper-customize");
  popupdiv_customize.classList.remove("wrapper-visible");
  popupdiv_customize.classList.add("wrapper-unvisible");
}