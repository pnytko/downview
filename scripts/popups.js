//AKTYWACJA POPUP'A O MNIE
function DisplayPopupDiv(){
    let popup = document.querySelector('#popup-div');

    if(popup.classList.contains('popup-div-visible')==false){
        popup.classList.remove('popup-div-novisible');
        popup.classList.add('popup-div-visible');
    }
}
function ClosePopup(){
    let popupdiv=document.querySelector('#popup-div');
    popupdiv.classList.remove('popup-div-visible');
    popupdiv.classList.add('popup-div-novisible');
}

//AKTYWACJA POPUP'A SZLAKI
function DisplayPopupDiv_trails(){
  let popup_trails = document.querySelector('#trails-popup');

  if(popup_trails.classList.contains('popup-div-visible')==false){
      popup_trails.classList.remove('popup-div-novisible');
      popup_trails.classList.add('popup-div-visible');
  }
}
function ClosePopup_trails(){
  let popupdiv_trails=document.querySelector('#trails-popup');
  popupdiv_trails.classList.remove('popup-div-visible');
  popupdiv_trails.classList.add('popup-div-novisible');
}
