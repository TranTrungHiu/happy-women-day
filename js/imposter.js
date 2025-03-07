const title = document.querySelector('.title')
const text = 'I have something for you'.split('')
for (let index = 0; index < text.length; index++) {
  if (text[index] !== ' ') {
    title.innerHTML += `<span>${text[index]}<span/>`
  } else {
    title.innerHTML += `<span style='margin-right: 20px;'><span/>`
  }
}

const textElements = document.querySelectorAll('.title span');
textElements.forEach((element) => {
  const randomDelay = Math.random() * 3; // Menghasilkan delay acak antara 0 hingga 3 detik
  element.style.animationDelay = `${randomDelay}s`;
});



document.addEventListener("DOMContentLoaded", function() {
  const audio = document.getElementById("bg-music");

  function playMusic() {
      audio.volume = 0.5; // Điều chỉnh âm lượng
      audio.play().catch(error => console.log("Autoplay failed:", error));
      document.removeEventListener("click", playMusic);
  }

  // Nếu autoplay bị chặn, sẽ chờ người dùng click để phát
  audio.play().catch(() => {
      console.log("Autoplay blocked, waiting for user interaction...");
      document.addEventListener("click", playMusic);
  });
});

