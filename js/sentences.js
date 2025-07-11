let sentenceData = {};

// Загружаем предложения по уровням
fetch("../data/sentences.json")
  .then(res => res.json())
  .then(data => {
    sentenceData = data;
  });

function startLevel(level) {
  const sentences = sentenceData[level];
  if (!sentences) {
    showStatus("⚠️ Предложения не найдены " + level);
    return;
  }

  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

  // УСТАНАВЛИВАЕМ предложение ОТДЕЛЬНО
  document.getElementById("target-sentence").textContent = randomSentence;

  speakAndListen(randomSentence);
}

function speakAndListen(targetSentence) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // СБРАСЫВАЕМ старые сообщения перед началом новой попытки
  clearResult();

  showStatus("Идёт запись...");

  recognition.start();

  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript.toLowerCase().trim();
    const expected = targetSentence.toLowerCase().trim();

   
    if (result === expected) {
      showStatus("Правильно!✅", true);
    } else {
      showStatus(`Неправильно.❌ Вы сказали: "${result}"`, false);
    }
  };

  recognition.onerror = function (event) {
    showStatus("⚠️ Ошибка: " + event.error);
  };
}

function showStatus(message, isCorrect = null) {
  const statusEl = document.getElementById("status-msg");
  statusEl.textContent = message;
  statusEl.className = "";

  if (isCorrect === true) statusEl.classList.add("correct");
  if (isCorrect === false) statusEl.classList.add("incorrect");
}

function clearResult() {
  // Сбрасываем все предыдущие результаты
  document.getElementById("status-msg").textContent = "";
  document.getElementById("status-msg").className = "";
  document.getElementById("user-response").textContent = "";
}
