'use strict'
let themeToggle = true

let currentKuralNumber = 1

document.getElementsByTagName('html')[0].classList.add('theme-dark')

let btnIncrement = document.getElementById('btn-inc')
let btnDecrement = document.getElementById('btn-dec')

let btnSuperIncrement = document.getElementById('btn-super-inc')
let btnSuperDecrement = document.getElementById('btn-super-dec')

let imgThiruvalluvar = document.getElementById('thiruvalluvar-img')
let btnSearch = document.getElementById('btn-search')
let txtKuralNumber = document.getElementById('kural-num-text')

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
    document.getElementById('line2').innerHTML = `${kuralJSON.Line2}`
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
  } catch (err) {
    console.log(err)
  }
}

function newKural () {
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
