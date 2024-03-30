const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const resetBt = document.querySelector('#reset-cont span')
const imgStatPause = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const startTemp = new Audio('sons/play.wav')
const pauseTemp = new Audio('sons/pause.mp3')
const finalTemp = new Audio('sons/beep.mp3')
musica.loop = true
const startPauseBt = document.querySelector('#start-pause')
let intervaloId = null
let time_01 = 60
let time_02 = 900
let time_03 = 1500
tempoDecorridoEmSegundos = time_01

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = time_01
  alterarContexto('foco')
  focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = time_02
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = time_03
  alterarContexto('descanso-longo')
  longoBt.classList.add('active')
})

function alterarContexto(contexto) {
	mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
  })

  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `imagens/${contexto}.png`)
  switch (contexto) {
  case "foco":
    titulo.innerHTML = `
    Optimize your productivity,<br>
    <strong class="app__title-strong">Immerse yourself in what matters.</strong>
    `
    break;
  case "descanso-curto":
    titulo.innerHTML = `
    How about taking a breather? <strong class="app__title-strong">Take a short break!</strong>
    ` 
    break;
  case "descanso-longo":
    titulo.innerHTML = `
    Time to return to the surface.<strong class="app__title-strong"> Take a long break.</strong>
    `
    break;
  default:
    break;
  }
}

const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0){        
    finalTemp.play()
    zerar()

    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if(intervaloId){
    pauseTemp.play()
    zerar()
    return
  }
  startTemp.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  iniciarOuPausarBt.textContent = "Pause"
  imgStatPause.setAttribute('src', `imagens/pause.png`)
}

function zerar() {
  clearInterval(intervaloId) 
  iniciarOuPausarBt.textContent = "Start"
  imgStatPause.setAttribute('src', `imagens/play_arrow.png`)
  musica.pause()
  musicaFocoInput.checked = false;
  intervaloId = null
}

resetBt.addEventListener('click', resetar)
function resetar(){
if (focoBt.classList.contains('active')) {
  pauseTemp.play()
  tempoDecorridoEmSegundos = time_01
  alterarContexto('foco')
  focoBt.classList.add('active')
  zerar()
  

}else if (curtoBt.classList.contains('active')) {
  pauseTemp.play()
  tempoDecorridoEmSegundos = time_02
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
  zerar()

}else if (longoBt.classList.contains('active')) {
  pauseTemp.play()
  tempoDecorridoEmSegundos = time_03
  alterarContexto('descanso-longo')
  longoBt.classList.add('active')
  zerar()

}
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

