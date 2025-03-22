document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const response = document.getElementById('response');
    const timerElement = document.getElementById('timer');

    // 目标时间：2025-02-14 00:00:00
    const targetDate = new Date('2025-02-14T00:00:00');

    // 更新计时器
    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerElement.textContent = `${days}天${hours}时${minutes}分${seconds}秒`;
    }

    // 信封点击事件
    envelope.addEventListener('click', () => {
        envelope.style.display = 'none';
        letter.classList.add('show');
        
        // 逐行显示文字
        const paragraphs = document.querySelectorAll('.animate-text');
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('visible');
                if(index === paragraphs.length -1) {
                    document.querySelector('.buttons').classList.remove('hidden');
                }
            }, 500 * index);
        });
    });

    // 按钮事件
    noBtn.addEventListener('mouseover', () => {
        noBtn.style.transform = `translate(${Math.random()*50-25}px, ${Math.random()*50-25}px)`;
    });

    yesBtn.addEventListener('click', () => {
        letter.classList.remove('show');
        response.classList.add('show');
        createHearts();
    });

    // 创建爱心动画
    function createHearts() {
        const hearts = ['💖', '💗', '💓', '💞'];
        for(let i=0; i<50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random()*hearts.length)];
                heart.style.position = 'absolute';
                heart.style.left = Math.random()*100 + '%';
                heart.style.animation = `fall ${Math.random()*3+2}s linear`;
                document.querySelector('.hearts').appendChild(heart);
            }, i * 100);
        }
    }

    // 初始化计时器
    setInterval(updateTimer, 1000);
    updateTimer();
});