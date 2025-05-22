let wordData = {};

// Загружаем предложения по уровням
fetch("../data/words.json")
  .then(res => res.json())
  .then(data => {
    wordData = data;
  });

function startLevel(level) {
  const word = wordData[level];
  if (!word) {
    showStatus("⚠️ Слова не найдены " + level);
    return;
  }

  const randomword = word[Math.floor(Math.random() * word.length)];

  // УСТАНАВЛИВАЕМ предложение ОТДЕЛЬНО
  document.getElementById("target-word").textContent = randomword;

  speakAndListen(randomword);
}

function speakAndListen(targetword) {
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
    const expected = targetword.toLowerCase().trim();

   
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
