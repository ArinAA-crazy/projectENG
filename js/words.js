let wordsData = {};
let currentLevel = null; // Добавим переменную для отслеживания уровня

fetch("../data/words.json")
  .then(res => {
    if (!res.ok) throw new Error('Ошибка загрузки данных');
    return res.json();
  })
  .then(data => {
    wordsData = data;
    console.log('Данные загружены:', wordsData); // Для отладки
  })
  .catch(err => {
    console.error('Ошибка:', err);
    alert('Не удалось загрузить словарь');
  });

function startLevel(level) {
  currentLevel = level; // Сохраняем текущий уровень
  const wordList = wordsData[level];
  
  if (!wordList || wordList.length === 0) {
    alert("No words found for level " + level);
    return;
  }

  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  speakAndListen(randomWord);
}

function speakAndListen(targetWord) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("Браузер не поддерживает распознавание речи");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  alert("Произнесите слово: " + targetWord);

  recognition.start();

  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript.toLowerCase().trim();
    const isCorrect = result === targetWord.toLowerCase();
    
    // Сохраняем результат для текущего уровня
    if (currentLevel !== null) {
      localStorage.setItem(`level_${currentLevel}`, isCorrect ? 'correct' : 'wrong');
    }

    alert(isCorrect ? "Правильно! ✔️" : `Неправильно ❌\nВаш ответ: ${result}`);
  };

  recognition.onerror = function (event) {
    alert("Ошибка распознавания: " + event.error);
    localStorage.setItem(`level_${currentLevel}`, 'error');
  };
}