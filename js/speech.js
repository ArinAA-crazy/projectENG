function startPractice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
    alert("Listening... Speak clearly!");
  
    recognition.onresult = function(event) {
      const speechResult = event.results[0][0].transcript;
      alert("You said: " + speechResult);
      // Здесь в будущем можно вставить анализ ошибок и проверку слов
    };
  
    recognition.onerror = function(event) {
      alert("Error occurred: " + event.error);
    };
  }