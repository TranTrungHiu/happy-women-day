onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('Happy International Women\'s Day').split('');
    const titleElement = document.getElementById('title');
    let index = 0;

    // Kiểm tra kích thước màn hình và thay đổi kích thước font
    let titleFontSize = window.innerWidth <= 768 ? "30px" : "60px"; // Màn hình nhỏ thì font nhỏ hơn
    titleElement.style.fontSize = titleFontSize;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};
