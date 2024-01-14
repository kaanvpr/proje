if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            var mediaRecorder = new MediaRecorder(stream);
            var audioChunks = [];
            var timerInterval;

            var startRecordingBtn = document.getElementById('startRecording');
            var stopRecordingBtn = document.getElementById('stopRecording');
            var downloadRecordingBtn = document.getElementById('downloadRecording');
            var timerElement = document.getElementById('timer');
            var recordingAnimation = document.getElementById('recording-animation');

            startRecordingBtn.addEventListener('click', function () {
                mediaRecorder.start();
                startRecordingBtn.disabled = true;
                stopRecordingBtn.disabled = false;
                downloadRecordingBtn.disabled = true;
                recordingAnimation.style.display = 'inline-block';

                // Başlama zamanını al
                var startTime = new Date().getTime();

                // Zaman sayacı her saniyede bir güncellenir
                timerInterval = setInterval(function () {
                    var elapsedTime = new Date().getTime() - startTime;
                    var formattedTime = formatTime(elapsedTime);
                    timerElement.textContent = formattedTime;
                }, 1000);
            });

            stopRecordingBtn.addEventListener('click', function () {
                mediaRecorder.stop();
                startRecordingBtn.disabled = false;
                stopRecordingBtn.disabled = true;
                downloadRecordingBtn.disabled = false;
                recordingAnimation.style.display = 'none';

                clearInterval(timerInterval);
                timerElement.textContent = '00:00';
            });

            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function () {
                var audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioChunks = [];
                var audioUrl = URL.createObjectURL(audioBlob);

                downloadRecordingBtn.addEventListener('click', function () {
                    var a = document.createElement('a');
                    a.href = audioUrl;
                    a.download = 'recording.wav';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            };
        })
        .catch(function (err) {
            console.error('Mikrofon erişimi hatası: ', err);
        });
} else {
    console.error('Tarayıcı MediaRecorder API desteklemiyor.');
}

function formatTime(milliseconds) {
    var totalSeconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return padZero(minutes) + ':' + padZero(seconds);
}

function padZero(number) {
    return (number < 10) ? '0' + number : number;
}
