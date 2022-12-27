//variáveis da bolinha
let eixoXBolinha = 400;
let eixoYBolinha = 250;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Raquete
let raqueteComprimento = 8;
let raqueteAltura = 90;

//variáveis minhaRaquete
let xRaquete = 10;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeYOponente = 50;
let chanceDeErrar = 0;

//colisão
let colidiu = false;

//placar do jogo
let meusPontos = 0;
let oponentePontos = 0;

//sons do jogo
let raquetada;
let ponto;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  bolinhaNaoFicaPresa();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //player2();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPonto();
  preload();
}

function mostraBolinha() {
  circle(eixoXBolinha, eixoYBolinha, diametro);
}

function movimentaBolinha() {
  eixoXBolinha += velocidadeXBolinha;
  eixoYBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (eixoXBolinha + raio > width || eixoXBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    ponto.play();
  } else if (eixoYBolinha + raio > height || eixoYBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function bolinhaNaoFicaPresa() {
  if (eixoXBolinha - raio < 0) {
    eixoXBolinha = 23;
  }
  if (eixoXBolinha - raio > width) {
    eixoXBolinha = 577;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  } else if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;   
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, eixoXBolinha, eixoYBolinha, raio);
  
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

/*
function player2() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  } else if(keyIsDown(83)) {
    yRaqueteOponente += 10;   
  }
}
*/

function movimentaRaqueteOponente() {
  velocidadeYOponente = eixoYBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
    chanceDeErrar = 35;
    }
  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(255, 140, 0);
  rect(130, 7, 40, 24);
  fill(255);
  text(meusPontos, 150, 26);
  fill(255, 140, 0);
  rect(530, 7, 40, 24);
  fill(255);
  text(oponentePontos, 550, 26)
}

function marcaPonto() {
  if(eixoXBolinha > 590) {
    meusPontos += 1;
  }
  if(eixoXBolinha < 10) {
    oponentePontos += 1;
  }
}

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}
