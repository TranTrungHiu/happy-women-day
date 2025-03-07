const petalContainer = document.getElementById('petal-container');

// Mảng các màu sắc chính xác như trong hình mẫu
const heartColors = [
  'rgba(255, 51, 153, 0.7)',    // Hồng đậm
  'rgba(255, 0, 127, 0.6)',     // Hồng đỏ
  'rgba(255, 102, 178, 0.65)',  // Hồng tươi
  'rgba(219, 112, 147, 0.7)',   // Hồng tím
  'rgba(238, 130, 238, 0.6)',   // Tím nhạt
  'rgba(255, 20, 147, 0.75)',   // Hồng đậm sáng
  'rgba(199, 21, 133, 0.7)'     // Hồng tím đậm
];

// Tạo trái tim di chuyển từ dưới lên trên
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  
  // Vị trí ngẫu nhiên theo chiều ngang, bắt đầu từ dưới màn hình
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '-50px'; // Bắt đầu từ dưới màn hình
  
  // Chọn màu ngẫu nhiên từ bảng màu
  const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.style.backgroundColor = randomColor;
  
  // Kích thước ngẫu nhiên (15-35px)
  const size = Math.random() * 20 + 15;
  heart.style.width = size + 'px';
  heart.style.height = size + 'px';
  
  // Thêm hiệu ứng phát sáng nhẹ
  heart.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px ${randomColor}`;
  
  // Tốc độ di chuyển ngẫu nhiên
  const animationDuration = Math.random() * 5 + 8; // 8-13 giây
  heart.style.animationDuration = `${animationDuration}s`;
  
  // Thêm biến ngẫu nhiên cho chuyển động chéo
  const randomOffset = Math.random() * 100 - 50; // -50 đến 50
  heart.style.setProperty('--random-offset', randomOffset);
  
  // Thêm vào container
  petalContainer.appendChild(heart);
  
  // Xóa trái tim sau khi animation kết thúc
  setTimeout(() => {
    heart.remove();
  }, animationDuration * 1000);
}

// Khởi tạo trái tim ban đầu
function initHearts() {
  // Xóa tất cả trái tim hiện tại
  while (petalContainer.firstChild) {
    petalContainer.removeChild(petalContainer.firstChild);
  }
  
  // Tạo nhiều trái tim ban đầu ở các vị trí khác nhau dọc theo chiều cao màn hình
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      
      // Phân bố ngẫu nhiên theo chiều ngang
      heart.style.left = Math.random() * 100 + '%';
      
      // Phân bố đều theo chiều dọc từ dưới lên trên
      // Đặt các trái tim ở các vị trí khác nhau để tạo hiệu ứng liên tục
      heart.style.bottom = (Math.random() * 120 - 20) + '%';
      
      // Chọn màu ngẫu nhiên từ bảng màu
      const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
      heart.style.backgroundColor = randomColor;
      
      // Kích thước ngẫu nhiên (15-35px)
      const size = Math.random() * 20 + 15;
      heart.style.width = size + 'px';
      heart.style.height = size + 'px';
      
      // Thêm hiệu ứng phát sáng nhẹ
      heart.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px ${randomColor}`;
      
      // Thêm biến ngẫu nhiên cho chuyển động chéo
      const randomOffset = Math.random() * 100 - 50;
      heart.style.setProperty('--random-offset', randomOffset);
      
      // Tất cả trái tim đều di chuyển
      const animationDuration = Math.random() * 5 + 8;
      heart.style.animationDuration = `${animationDuration}s`;
      
      // Đặt animation-delay để tạo hiệu ứng liên tục
      // Trái tim ở dưới bắt đầu di chuyển trước, trái tim ở trên bắt đầu di chuyển sau
      const delay = (1 - parseFloat(heart.style.bottom) / 100) * animationDuration;
      heart.style.animationDelay = `-${delay}s`;
      
      // Thêm vào container
      petalContainer.appendChild(heart);
      
      // Xóa trái tim sau khi animation kết thúc
      setTimeout(() => {
        heart.remove();
      }, (animationDuration - delay) * 1000);
    }, i * 50);
  }
  
  // Tiếp tục tạo trái tim mới theo thời gian
  setInterval(() => {
    // Kiểm tra số lượng trái tim hiện tại
    if (petalContainer.children.length < 300) { // Giới hạn số lượng trái tim
      createHeart();
    }
  }, 300); // Tạo trái tim mới thường xuyên
}

// Khởi tạo khi trang đã tải xong
document.addEventListener('DOMContentLoaded', initHearts); 