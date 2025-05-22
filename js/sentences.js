let sentenceData = {};

// Загружаем предложения по уровням
fetch("../data/sentences.json")
  .then(res => res.json())
  .then(data => {
    sentenceData = data;
  });

// Функция запуска уровня
function startLevel(level) {
  const sentences = sentenceData[level];
  if (!sentences) {
    alert("No sentences found for level " + level);
    return;
  }

  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  speakAndListen(randomSentence);
}

// Функция озвучки и распознавания речи
function speakAndListen(targetSentence) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  alert("Произнесите это предложение:\n" + targetSentence);

  recognition.start();

  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript.toLowerCase().trim();
    const expected = targetSentence.toLowerCase().trim();
    
    if (result === expected) {
      alert("Правильно! ✔️");
    } else {
      alert(`Неправильно ❌\nВы сказали:\n${result}`);
    }
  };

  recognition.onerror = function (event) {
    alert("Error: " + event.error);
  };
}
