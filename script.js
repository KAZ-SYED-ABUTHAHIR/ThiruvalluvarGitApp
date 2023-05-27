'use strict'

const c = console.log

let ZOOM_FLAG = false, zoomTimeoutID 

let themeToggle = true

let currentKuralNumber = 1

document.getElementsByTagName('html')[0].classList.add('theme-dark')

let btnIncrement = document.getElementById('btn-inc')
let btnDecrement = document.getElementById('btn-dec')

let btnSuperIncrement = document.getElementById('btn-super-inc')
let btnSuperDecrement = document.getElementById('btn-super-dec')

let imgThiruvalluvar = document.getElementById('thiruvalluvar-img')
let btnSearch = document.getElementById('btn-search')
let btnRandom = document.getElementById('btn-random')
let txtKuralNumber = document.getElementById('kural-num-text')

let audio = document.getElementById("audio");

let zoomOverlay = document.getElementById('zoom-overlay')

let setKuralData = kuralNumber => {
  try {
    let kuralJSON = kural['kural'][kuralNumber - +1]

    document.getElementById('sec-title').innerHTML = `${kuralJSON.sect_tam}`
    document.getElementById(
      'chapter-title'
    ).innerHTML = `${kuralJSON.chapgrp_tam}`
    document.getElementById(
      'sub-chapter-title'
    ).innerHTML = `${kuralJSON.chap_tam}`
    document.getElementById('num').innerHTML = `${kuralJSON.number}`
    document.getElementById('eng-verse-text').innerHTML = `${kuralJSON.eng}.`
    document.getElementById('line1').innerHTML = `${kuralJSON.Line1}`
    document.getElementById('line1-tamizhi').innerHTML = `${kuralJSON.Line1}`
    document.getElementById('line2').innerHTML = `${kuralJSON.Line2}`
    document.getElementById('line2-tamizhi').innerHTML = `${kuralJSON.Line2}`
    document.getElementById('eng-exp-text').innerHTML = `${kuralJSON.eng_exp}.`
    document.getElementById('muva-text').innerHTML = `${kuralJSON.mv}`
    document.getElementById('muka-text').innerHTML = `${kuralJSON.mk}.`
    document.getElementById('sp-text').innerHTML = `${kuralJSON.sp}`
    document.getElementById('eng-sec-title').innerHTML = `${kuralJSON.sect_eng}`
    document.getElementById(
      'eng-chapter-title'
    ).innerHTML = `${kuralJSON.chapgrp_eng}`
    document.getElementById(
      'eng-sub-chapter-title'
    ).innerHTML = `${kuralJSON.chap_eng}`

    audio.pause();
    audio.src = `https://www.valaitamil.com/upload/kural_audio/${kuralJSON.number}.mp3`
    audio.load()
  } catch (err) {
    console.log(err)
  }
}

function newRandomKural() {
  function randomNumberBetween (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  let kuralNumber = randomNumberBetween(1, 1330)
  setKuralData(kuralNumber)
  currentKuralNumber = kuralNumber
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let zoomKuralNode 

function zoomKural () {
  if(!ZOOM_FLAG){
  zoomKuralNode = document.getElementById('kural-text').cloneNode(true)
  window.scrollTo({ top: 0, behavior: 'smooth' })
  zoomOverlay.appendChild(zoomKuralNode)
  zoomOverlay.classList.replace('zoom-overlay-hide','zoom-overlay-show')
  
  zoomTimeoutID = setTimeout(()=>{
    zoomOverlay.classList.replace('zoom-overlay-show','zoom-overlay-hide')
    zoomOverlay.removeChild(zoomKuralNode)
    
    ZOOM_FLAG = false
  }, 120000)
  

  ZOOM_FLAG = true 
}
}

zoomOverlay.addEventListener('click',()=>{
  zoomOverlay.classList.replace('zoom-overlay-show','zoom-overlay-hide')
  zoomOverlay.removeChild(zoomKuralNode)
  ZOOM_FLAG = false
  clearTimeout(zoomTimeoutID)
})

btnRandom.addEventListener('click', (e)=>{
  newRandomKural()
  btnRandom.classList.add("animate");

  // Remove the animate class after the animation ends
  setTimeout(() => {
    btnRandom.classList.remove("animate");
  }, 1000);
})

btnIncrement.addEventListener('click', () => {
  if (1 <= currentKuralNumber && currentKuralNumber < 1330) {
    setKuralData(++currentKuralNumber)
  } else if (currentKuralNumber === 1330) {
  }
})

btnSuperIncrement.addEventListener('click', () => {
  if (1 <= currentKuralNumber && currentKuralNumber < 1330) {
    setKuralData(currentKuralNumber + 10)
    currentKuralNumber += 10
  } else if (currentKuralNumber === 1330) {
  }
})

btnDecrement.addEventListener('click', () => {
  if (1 < currentKuralNumber && currentKuralNumber <= 1330) {
    setKuralData(--currentKuralNumber)
  } else if (currentKuralNumber === 1) {
  }
})

btnSuperDecrement.addEventListener('click', () => {
  if (1 < currentKuralNumber && currentKuralNumber <= 1330) {
    setKuralData(currentKuralNumber - 10)
    currentKuralNumber -= 10
  } else if (currentKuralNumber === 1) {
  }
})

const searchKuralData = () => {
  try {
    let kuralNumber = Number(txtKuralNumber.value)
    setKuralData(kuralNumber)
    currentKuralNumber = kuralNumber
  } catch (err) {
    console.log(err)
  } finally {
    txtKuralNumber.value = ''
  }
}

btnSearch.addEventListener('click', () => searchKuralData())

txtKuralNumber.addEventListener('keyup', e =>
  event.key === 'Enter' ? searchKuralData() : _ => _
)

//? Theme Toggle
imgThiruvalluvar.addEventListener('click', () => {
  themeToggle
    ? document
        .getElementsByTagName('html')[0]
        .classList.replace('dark-theme', 'light-theme')
    : document
        .getElementsByTagName('html')[0]
        .classList.replace('light-theme', 'dark-theme')

  themeToggle = !themeToggle
})


/* --------------------------------Snackbar Code From ChatGPT ----------------------------------*/

// Define some variables to store the touch coordinates
let touchStartY = null;
let touchEndY = null;

// Define a function to handle the touch start event
function handleTouchStart(event) {
  // Get the first touch object
  const touch = event.touches[0];

  // Store the start y coordinate
  touchStartY = touch.clientY;
}

// Define a function to handle the touch move event
function handleTouchMove(event) {
  // Get the first touch object
  const touch = event.touches[0];

  // Store the end y coordinate
  touchEndY = touch.clientY;
}

// Define a function to handle the touch end event
function handleTouchEnd(event) {
  // Get the snackbar element
  const snackbar = document.getElementById("snackbar");

  // Check if the user swiped up from the bottom edge
  if (touchStartY > window.innerHeight - 50 && touchEndY < touchStartY) {
    // Show the snackbar by adding the show class
    snackbar.classList.add("show");

    // Hide the snackbar after 3 seconds
    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 4000);
  }
}
