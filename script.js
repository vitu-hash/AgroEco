/* ═══════════════════════════════════════════════════════════
   AgroEco — script.js
   Lógica completa do Quiz Interativo
   ═══════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────
   1. BANCO DE PERGUNTAS
   Cada objeto possui:
     - pergunta : texto da questão
     - opcoes   : array com 4 alternativas
     - correta  : índice (0-3) da alternativa correta
   ────────────────────────────────────────────────────────── */
const perguntas = [
  {
    pergunta: "O que é agricultura sustentável?",
    opcoes: [
      "Produção agrícola que maximiza o uso de agrotóxicos para maior rendimento.",
      "Sistema de produção que satisfaz as necessidades atuais sem comprometer os recursos para as gerações futuras.",
      "Modelo de cultivo baseado exclusivamente em tecnologia de ponta e mecanização pesada.",
      "Forma de agricultura voltada apenas para a exportação de commodities."
    ],
    correta: 1
  },
  {
    pergunta: "Qual é o principal benefício da compostagem para o solo?",
    opcoes: [
      "Aumentar a salinidade do solo para evitar pragas.",
      "Eliminar microrganismos prejudiciais com calor elevado.",
      "Enriquecer o solo com matéria orgânica e nutrientes essenciais de forma natural.",
      "Tornar o solo mais compactado para reter água por mais tempo."
    ],
    correta: 2
  },
  {
    pergunta: "A rotação de culturas consiste em:",
    opcoes: [
      "Plantar sempre a mesma cultura para manter a uniformidade da produção.",
      "Alternar diferentes espécies vegetais na mesma área ao longo das estações.",
      "Rodar fisicamente as plantas para que recebam sol por igual.",
      "Substituir as culturas tradicionais por espécies geneticamente modificadas."
    ],
    correta: 1
  },
  {
    pergunta: "O sistema de irrigação por gotejamento é considerado sustentável porque:",
    opcoes: [
      "Utiliza grandes volumes de água para garantir solo sempre encharcado.",
      "Não precisa de manutenção, economizando mão de obra.",
      "Entrega água diretamente à raiz da planta, reduzindo o desperdício em até 60 %.",
      "Usa água salgada do mar, abundante e renovável."
    ],
    correta: 2
  },
  {
    pergunta: "O que é controle biológico de pragas?",
    opcoes: [
      "Aplicação massiva de pesticidas em horários específicos do dia.",
      "Uso de inimigos naturais das pragas, como predadores e parasitas, para controlar populações.",
      "Introdução de pragas de outras regiões para competição ecológica.",
      "Isolamento total das lavouras com barreiras físicas de plástico."
    ],
    correta: 1
  },
  {
    pergunta: "O que é agrofloresta?",
    opcoes: [
      "Plantio de árvores exclusivamente para extração de madeira.",
      "Método de desmatamento controlado para ampliar a área agrícola.",
      "Sistema que integra árvores, arbustos e culturas agrícolas no mesmo espaço, imitando a floresta.",
      "Técnica de cultivo em estufas com iluminação artificial."
    ],
    correta: 2
  },
  {
    pergunta: "Qual dos seguintes é um efeito positivo da cobertura do solo (mulching)?",
    opcoes: [
      "Acelera a erosão do solo em dias chuvosos.",
      "Retém a umidade, reduz ervas daninhas e regula a temperatura do solo.",
      "Aumenta a necessidade de irrigação diária.",
      "Impede a entrada de nutrientes no solo."
    ],
    correta: 1
  },
  {
    pergunta: "Como a agricultura sustentável contribui para combater as mudanças climáticas?",
    opcoes: [
      "Aumentando as emissões de CO₂ para estimular o crescimento das plantas.",
      "Eliminando toda a vegetação nativa para plantar espécies mais resistentes.",
      "Favorecendo o sequestro de carbono no solo e reduzindo emissões de gases de efeito estufa.",
      "Aumentando o uso de combustíveis fósseis em maquinário agrícola moderno."
    ],
    correta: 2
  },
  {
    pergunta: "O que é biofertilizante?",
    opcoes: [
      "Fertilizante sintético produzido em laboratório a partir de petróleo.",
      "Substância produzida por microrganismos benéficos que fornece nutrientes e melhora a saúde do solo.",
      "Produto químico que elimina bactérias do solo para evitar doenças.",
      "Adubo mineral obtido pela extração de rochas fosfatadas."
    ],
    correta: 1
  },
  {
    pergunta: "Qual prática ajuda a preservar as nascentes e cursos d'água em propriedades agrícolas?",
    opcoes: [
      "Desmatar as margens dos rios para facilitar o acesso do gado à água.",
      "Usar agrotóxicos próximos a rios para eliminar plantas aquáticas indesejadas.",
      "Manter a Área de Preservação Permanente (APP) com vegetação nativa ao redor de nascentes e rios.",
      "Canalizar todos os rios para irrigação intensiva das lavouras."
    ],
    correta: 2
  }
];

/* ──────────────────────────────────────────────────────────
   2. REFERÊNCIAS AOS ELEMENTOS DO DOM
   ────────────────────────────────────────────────────────── */
const telaInicio    = document.getElementById('quiz-start');
const telaJogo      = document.getElementById('quiz-play');
const telaResultado = document.getElementById('quiz-result');

const elCounter      = document.getElementById('quiz-counter');
const elProgress     = document.getElementById('quiz-progress');
const elScoreLive    = document.getElementById('quiz-score-live');
const elQuestion     = document.getElementById('quiz-question');
const elOptions      = document.getElementById('quiz-options');
const btnNext        = document.getElementById('btn-next');

const elResultScore  = document.getElementById('result-score');
const elResultMsg    = document.getElementById('result-msg');
const elResultEmoji  = document.getElementById('result-emoji');
const elResultBar    = document.getElementById('result-bar-fill');

const btnStart       = document.getElementById('btn-start');
const btnRestart     = document.getElementById('btn-restart');

/* ──────────────────────────────────────────────────────────
   3. ESTADO DO QUIZ
   ────────────────────────────────────────────────────────── */
let indicePergunta = 0;   // pergunta atual (0 a 9)
let pontuacao      = 0;   // número de acertos
let respondido     = false; // bloqueia múltiplas respostas

/* ──────────────────────────────────────────────────────────
   4. FUNÇÕES AUXILIARES DE VISIBILIDADE
   ────────────────────────────────────────────────────────── */

/** Exibe um elemento removendo o atributo hidden */
function mostrar(el) { el.removeAttribute('hidden'); }

/** Oculta um elemento adicionando o atributo hidden */
function ocultar(el) { el.setAttribute('hidden', ''); }

/* ──────────────────────────────────────────────────────────
   5. INICIALIZAR / REINICIAR O QUIZ
   ────────────────────────────────────────────────────────── */
function iniciarQuiz() {
  // Reinicia o estado
  indicePergunta = 0;
  pontuacao      = 0;
  respondido     = false;

  // Troca de telas
  ocultar(telaInicio);
  ocultar(telaResultado);
  mostrar(telaJogo);

  // Carrega a primeira pergunta
  carregarPergunta();
}

/* ──────────────────────────────────────────────────────────
   6. CARREGAR PERGUNTA ATUAL
   ────────────────────────────────────────────────────────── */
function carregarPergunta() {
  respondido = false;
  ocultar(btnNext);

  const total    = perguntas.length;
  const atual    = indicePergunta + 1;
  const dados    = perguntas[indicePergunta];
  const letras   = ['A', 'B', 'C', 'D'];

  // Atualiza contador e barra de progresso
  elCounter.textContent       = `Pergunta ${atual} de ${total}`;
  elProgress.style.width      = `${((atual - 1) / total) * 100}%`;
  elScoreLive.textContent     = `✅ ${pontuacao} acerto${pontuacao !== 1 ? 's' : ''}`;

  // Exibe a pergunta
  elQuestion.textContent = dados.pergunta;

  // Limpa opções anteriores e cria as novas
  elOptions.innerHTML = '';

  dados.opcoes.forEach(function(texto, index) {
    const li     = document.createElement('li');
    const button = document.createElement('button');

    button.classList.add('quiz__option');
    button.setAttribute('type', 'button');
    button.dataset.index = index;

    // Letra identificadora (A, B, C, D)
    const span = document.createElement('span');
    span.classList.add('option__letter');
    span.textContent = letras[index];

    button.appendChild(span);
    button.appendChild(document.createTextNode(texto));

    // Evento de clique na alternativa
    button.addEventListener('click', selecionarResposta);

    li.appendChild(button);
    elOptions.appendChild(li);
  });
}

/* ──────────────────────────────────────────────────────────
   7. PROCESSAR RESPOSTA SELECIONADA
   ────────────────────────────────────────────────────────── */
function selecionarResposta(evento) {
  // Evita que o usuário clique novamente após já ter respondido
  if (respondido) return;
  respondido = true;

  const botaoClicado = evento.currentTarget;
  const indiceEscolhido = parseInt(botaoClicado.dataset.index, 10);
  const indiceCorreto   = perguntas[indicePergunta].correta;

  // Desabilita todos os botões de opção
  const todosOsBotoes = elOptions.querySelectorAll('.quiz__option');
  todosOsBotoes.forEach(function(btn) {
    btn.disabled = true;
  });

  // Marca a resposta correta em verde
  todosOsBotoes[indiceCorreto].classList.add('correct');

  if (indiceEscolhido === indiceCorreto) {
    // Resposta certa: incrementa pontuação
    pontuacao++;
    elScoreLive.textContent = `✅ ${pontuacao} acerto${pontuacao !== 1 ? 's' : ''}`;
  } else {
    // Resposta errada: destaca em vermelho
    botaoClicado.classList.add('wrong');
  }

  // Exibe botão de avançar
  mostrar(btnNext);
}

/* ──────────────────────────────────────────────────────────
   8. AVANÇAR PARA PRÓXIMA PERGUNTA OU EXIBIR RESULTADO
   ────────────────────────────────────────────────────────── */
function avancarPergunta() {
  indicePergunta++;

  if (indicePergunta < perguntas.length) {
    // Ainda há perguntas: carrega a próxima
    carregarPergunta();
  } else {
    // Acabaram as perguntas: exibe resultado
    exibirResultado();
  }
}

/* ──────────────────────────────────────────────────────────
   9. EXIBIR TELA DE RESULTADO FINAL
   ────────────────────────────────────────────────────────── */
function exibirResultado() {
  ocultar(telaJogo);
  mostrar(telaResultado);

  const total      = perguntas.length;
  const percentual = Math.round((pontuacao / total) * 100);

  // Pontuação numérica
  elResultScore.textContent = `Você acertou ${pontuacao} de ${total}`;

  // Mensagem e emoji personalizados conforme desempenho
  if (pontuacao <= 4) {
    elResultMsg.textContent   = 'Continue aprendendo sobre sustentabilidade! Explore as práticas apresentadas no site e tente novamente.';
    elResultEmoji.textContent = '🌱';
  } else if (pontuacao <= 7) {
    elResultMsg.textContent   = 'Bom trabalho! Você já possui bons conhecimentos sobre agricultura sustentável. Continue se aprofundando!';
    elResultEmoji.textContent = '🌿';
  } else {
    elResultMsg.textContent   = 'Excelente! Você é um verdadeiro defensor da agricultura sustentável. Parabéns pelo conhecimento!';
    elResultEmoji.textContent = '🏆';
  }

  // Anima a barra de resultado com um pequeno delay para a transição CSS funcionar
  setTimeout(function() {
    elResultBar.style.width = `${percentual}%`;
  }, 100);

  // Atualiza a barra de progresso para 100 %
  elProgress.style.width = '100%';
}

/* ──────────────────────────────────────────────────────────
   10. EVENTOS DOS BOTÕES
   ────────────────────────────────────────────────────────── */

// Botão "Começar Quiz"
btnStart.addEventListener('click', iniciarQuiz);

// Botão "Próxima pergunta"
btnNext.addEventListener('click', avancarPergunta);

// Botão "Reiniciar Quiz"
btnRestart.addEventListener('click', function() {
  // Reseta a barra de resultado antes de reiniciar (sem transição)
  elResultBar.style.transition = 'none';
  elResultBar.style.width      = '0%';

  // Força reflow para que a transição seja removida antes de iniciar
  void elResultBar.offsetWidth;

  // Restaura a transição para o próximo resultado
  elResultBar.style.transition = '';

  // Volta à tela de início
  ocultar(telaResultado);
  mostrar(telaInicio);

  // Reinicia o estado interno
  indicePergunta = 0;
  pontuacao      = 0;
  respondido     = false;
});
