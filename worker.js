// worker.js

// Nhập thư viện html2canvas vào Worker
// BẠN CẦN THAY THẾ ĐƯỜNG DẪN NÀY BẰNG ĐƯỜNG DẪN THỰC TẾ
importScripts('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');

self.onmessage = function(e) {
    const { type, elementId, scale, backgroundColor } = e.data;

    if (type === 'CAPTURE') {
        // html2canvas không thể truy cập DOM trực tiếp từ Worker.
        // Vì vậy, chúng ta không thể sử dụng html2canvas trong Worker theo cách này.
        // Đây là một hạn chế kỹ thuật phức tạp.
        
        // GIẢI PHÁP THAY THẾ:
        // Thay vì sử dụng html2canvas, chúng ta sẽ sử dụng thư viện `dom-to-image`
        // Thư viện này có khả năng hoạt động tốt hơn trong Web Worker.
        
        // Tải thư viện dom-to-image
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js');

        // Lấy element từ Main Thread (thông qua elementId)
        // Lưu ý: Hạn chế của dom-to-image trong Worker là nó vẫn cần một số 
        // thao tác trên Main Thread. Việc thực hiện chụp ảnh DOM hoàn toàn
        // trong Worker là rất khó khăn với các công cụ hiện tại.

        // Vì vậy, để khắc phục vấn đề "đơ" máy, giải pháp thực tế nhất là
        // tối ưu hóa việc sử dụng html2canvas trên Main Thread như sau:
        // 1. Giảm độ phân giải ảnh (scale).
        // 2. Chụp ảnh từng phần nếu giao diện quá phức tạp.
        // 3. Hiển thị thông báo "Đang xử lý..." để người dùng biết.

        // Dưới đây là đoạn code tối ưu hóa trên Main Thread:
        /*
        captureBtn.addEventListener('click', () => {
            // Hiển thị trạng thái đang xử lý
            captureBtn.innerHTML = 'Đang xử lý...';
            captureBtn.disabled = true;
            messageEle.style.display = 'none';

            // Giảm scale xuống để giảm tải cho thiết bị di động
            const optimizedScale = window.innerWidth < 768 ? 1 : 2; 

            // Lập lịch chụp ảnh
            requestAnimationFrame(() => {
                setTimeout(() => {
                    html2canvas(gameCard, {
                        useCORS: true, 
                        scale: optimizedScale, // Sử dụng scale đã tối ưu
                        backgroundColor: '#1a1a1a'
                    }).then(canvas => {
                        // Khôi phục lại giao diện
                        captureBtn.innerHTML = '📸 Tải ảnh minh chứng';
                        captureBtn.disabled = false;
                        messageEle.style.display = 'block';

                        // Tải ảnh
                        const link = document.createElement('a');
                        link.download = `UNESCO_${mssvText.textContent}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                    }).catch(error => {
                        console.error('html2canvas error:', error);
                        // Khôi phục giao diện nếu lỗi
                        captureBtn.innerHTML = '📸 Tải ảnh minh chứng';
                        captureBtn.disabled = false;
                        messageEle.style.display = 'block';
                    });
                }, 100); // Đợi một chút để giao diện cập nhật
            });
        });
        */
    }
};