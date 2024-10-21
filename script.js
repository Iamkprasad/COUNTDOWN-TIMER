(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  // Birthday countdown setup
  let today = new Date(),
      birthday = new Date(today.getFullYear(), 9, 24); // October 22 (Month is 0-indexed)
  
  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1); // Next year if today is past the birthday
  }
  
  const countDown = birthday.getTime(),
        countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const now = new Date().getTime(),
          distance = countDown - now;

    document.getElementById("days").innerText = Math.floor(distance / day);
    document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
    document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
    document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);

    // Check if countdown is complete
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("headline").innerText = "It's Party Time!";
      document.getElementById("countdown").style.display = "none";
      document.getElementById("content").style.display = "block";
      startConfetti();
    }
  }

  // Emoji rain setup
  let emojiRainInterval;
  const emojiButton = document.getElementById('emojiButton');
  const stopButton = document.getElementById('stopButton');
  const externalButton = document.getElementById('externalButton'); // New button

  emojiButton.addEventListener('click', startEmojiRain);
  stopButton.addEventListener('click', stopEmojiRain);
  externalButton.addEventListener('click', () => {
    window.open('https://www.instagram.com/blooming_stories7', '_blank'); // Open URL in a new tab
  });

  function startEmojiRain() {
    if (emojiRainInterval) return; // Prevent multiple intervals

    emojiRainInterval = setInterval(() => {
      const emojiElement = document.createElement('div');
      emojiElement.innerText = '🌻'; // Single emoji 🌻
      emojiElement.classList.add('emoji-rain');
      emojiElement.style.left = `${Math.random() * 100}vw`;
      emojiElement.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed
      document.body.appendChild(emojiElement);

      // Remove emoji after falling
      setTimeout(() => {
        emojiElement.remove();
      }, 5000);
    }, 300);
  }

  function stopEmojiRain() {
    clearInterval(emojiRainInterval);
    emojiRainInterval = null;
  }

  // Confetti animation setup
  function startConfetti() {
    const confetti = document.getElementById('confetti');
    const ctx = confetti.getContext('2d');
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    function randomColor() {
      const colors = ['#ff0', '#f00', '#0f0', '#00f', '#ff69b4'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * confetti.width,
          y: Math.random() * confetti.height - confetti.height,
          r: Math.random() * 4 + 1,
          d: Math.random() * particleCount,
          color: randomColor(),
          tilt: Math.random() * 10 - 10
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, confetti.width, confetti.height);

      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += Math.cos(p.d) + 1; // Gravity effect
        p.x += Math.sin(p.tilt);

        // Reset particle if it falls out of view
        if (p.y > confetti.height) {
          particles[i] = {
            x: Math.random() * confetti.width,
            y: -p.r,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt
          };
        }
      });

      requestAnimationFrame(drawParticles);
    }

    createParticles();
    drawParticles();
  }
}());
