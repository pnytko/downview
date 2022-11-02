//AKTYWACJA POPUP'A O MNIE
function DisplayWrapperAbout(){
    let popup = document.querySelector('#wrapper-about');

    if(popup.classList.contains('popup-div-visible')==false){
        popup.classList.remove('popup-div-novisible');
        popup.classList.add('popup-div-visible');
    }
}
function CloseWrapperAbout(){
    let popupdiv=document.querySelector('#wrapper-about');
    popupdiv.classList.remove('popup-div-visible');
    popupdiv.classList.add('popup-div-novisible');
}

//AKTYWACJA POPUP'A SZLAKI
function DisplayWrapperTrails(){
  let popup_trails = document.querySelector('#wrapper-trails');

  if(popup_trails.classList.contains('popup-div-visible')==false){
      popup_trails.classList.remove('popup-div-novisible');
      popup_trails.classList.add('popup-div-visible');
  }
}
function CloseWrapperTrails(){
  let popupdiv_trails=document.querySelector('#wrapper-trails');
  popupdiv_trails.classList.remove('popup-div-visible');
  popupdiv_trails.classList.add('popup-div-novisible');
}

