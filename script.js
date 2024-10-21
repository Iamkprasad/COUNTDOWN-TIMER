(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "10/24/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  
  const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
          const now = new Date().getTime(),
                distance = countDown - now;

          document.getElementById("days").innerText = Math.floor(distance / (day));
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

          if (distance < 0) {
            document.getElementById("headline").innerText = "It's Party Time!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
            startConfetti();
          }
        }, 1000);

  // Emoji rain effect
  const emojiButton = document.getElementById('emojiButton');
  emojiButton.addEventListener('click', () => {
    startEmojiRain();
  });

  function startEmojiRain() {
    const emojis = ['🎉', '🎂', '🥳', '🎁', '🎈', '🍾', '🎊'];
    setInterval(() => {
      const emojiElement = document.createElement('div');
      emojiElement.innerText = emojis[Math.floor(Math.random() * emojis.length)];
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

  // Confetti animation setup (same as before)
  function startConfetti() {
    const confetti = document.getElementById('confetti');
    const ctx = confetti.getContext('2d');
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;

    let particles = [],
        particleCount = 100;

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
          tilt: Math.random() * 4 - 2
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
        p.y += Math.cos(p.d) + 1;
        p.x += Math.sin(p.tilt);

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
