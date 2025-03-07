// Handle "No" button moving away
function moveButton() {
    let button = document.getElementById("noButton");
    let container = document.querySelector(".container");

    let containerRect = container.getBoundingClientRect();
    let buttonRect = button.getBoundingClientRect();

    let maxX = containerRect.width - buttonRect.width - 10;
    let maxY = containerRect.height - buttonRect.height - 10;

    if (window.innerWidth <= 600) {
        maxX = window.innerWidth - buttonRect.width - 20;
        maxY = window.innerHeight - buttonRect.height - 20;
    }

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    button.style.position = "absolute";
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
}

// Handle image change for different buttons
function showHappyCats() {
    document.querySelector(".gif_container").innerHTML = `
        <img src="images/happy-cat.gif" alt="Happy Cat" />
        <img src="images/happy-cat-2.gif" alt="Happy Cat" />
        <img src="images/happy-cat-3.gif" alt="Happy Cat" />
    `;
}

function showSadCats() {
    document.querySelector(".gif_container").innerHTML = `
        <img src="images/sad-cat.gif" alt="Sad Cat" />
        <img src="images/sad-cat-2.gif" alt="Sad Cat" />
        <img src="images/sat-cat-3.gif" alt="Sad Cat" />
    `;
}

// Handle countdown and page redirection
function nextPage() {
    let header = document.querySelector(".header_text");
    let gifContainer = document.querySelector(".gif_container");
    let buttonsContainer = document.querySelector(".buttons");

    // Hide buttons
    buttonsContainer.style.display = "none";

    // Replace images with loading GIFs
    gifContainer.innerHTML = `
        <img src="images/loading-cat.gif" alt="Loading Cat" />
        <img src="images/loading-cat-2.gif" alt="Loading Cat" />
        <img src="images/loading-cat-3.gif" alt="Loading Cat" />
    `;

    // Play the waiting sound
    const waitSound = new Audio("wait-a-minutes.mp3");
    waitSound.play();

    // Gradual countdown (total duration: 9s)
    let countdownTimes = [3, 2.5, 2, 1.8, 1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.4, 0.2];
    countdownTimes.forEach((num, index) => {
        setTimeout(() => {
            header.innerText = num.toFixed(1); // Keep one decimal place
        }, index * 750); // Adjust timing to stretch over 9s
    });

    // Show "Startttt!" instead of 0
    setTimeout(() => {
        header.innerText = "Đi nào!";
    }, 9000);

    // Redirect after countdown
    setTimeout(() => {
        window.location.href = "ChucAiLinh8Thang3VuiVe.html"; // Change this if needed
    }, 10500); // Added a 1.5s delay for "Startttt!" effect
}

// Handle button sounds
const yesSound = new Audio("yes-button.mp3");
const noSound = new Audio("no-button.mp3");

function playYesSound() {
    yesSound.currentTime = 0;
    yesSound.play();
}

function playNoSound() {
    noSound.currentTime = 0;
    noSound.play();
}

function changeQuestionToNo() {
    document.querySelector(".header_text").innerText = "Sao Ái Linh lại sợ, mở đi mà!!!!";
}

function changeQuestionToYes() {
    document.querySelector(".header_text").innerText = "Ái Linh có muốn mở hộp quà này chứ?";
}

// Kiểm tra xem người dùng đang sử dụng thiết bị di động hay không
function isMobileDevice() {
    return (window.innerWidth <= 600) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// Thiết lập các sự kiện dựa trên loại thiết bị
function setupEventListeners() {
    // Thiết lập nội dung nút
    document.getElementById("yesButton").innerText = "Mở lun!";
    document.getElementById("noButton").innerText = "Không tui sợ lém! 😱";
    
    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");
    
    // Xóa tất cả event listeners hiện tại (để tránh trùng lặp khi gọi lại hàm này)
    noButton.replaceWith(noButton.cloneNode(true));
    yesButton.replaceWith(yesButton.cloneNode(true));
    
    // Lấy lại reference sau khi clone
    const newNoButton = document.getElementById("noButton");
    const newYesButton = document.getElementById("yesButton");
    
    // Cả thiết bị di động và máy tính: Nút No chỉ phản ứng khi click
    newNoButton.addEventListener("click", moveButton);
    newNoButton.addEventListener("click", showSadCats);
    newNoButton.addEventListener("click", changeQuestionToNo);
    newNoButton.addEventListener("click", playNoSound);
    
    if (isMobileDevice()) {
        // Thiết bị di động: Nút Yes chỉ phản ứng khi click
        newYesButton.addEventListener("click", showHappyCats);
        newYesButton.addEventListener("click", changeQuestionToYes);
        newYesButton.addEventListener("click", playYesSound);
        newYesButton.addEventListener("click", nextPage);
    } else {
        // Máy tính: Nút Yes phản ứng khi click và mouseover
        newYesButton.addEventListener("click", showHappyCats);
        newYesButton.addEventListener("click", changeQuestionToYes);
        newYesButton.addEventListener("click", playYesSound);
        newYesButton.addEventListener("click", nextPage);
        
        // Thêm hiệu ứng hover cho nút Yes trên máy tính
        newYesButton.addEventListener("mouseover", showHappyCats);
        newYesButton.addEventListener("mouseover", changeQuestionToYes);
        newYesButton.addEventListener("mouseover", playYesSound);
    }
}

// Thiết lập event listeners khi trang được tải
window.addEventListener("load", setupEventListeners);

// Thiết lập lại event listeners khi kích thước màn hình thay đổi
window.addEventListener("resize", setupEventListeners);

