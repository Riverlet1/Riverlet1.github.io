// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const PUZZLE_SIZE = 3; // 3x3 拼图
    const PIECE_SIZE = 400 / PUZZLE_SIZE;
    let pieces = [];
    let emptyPosition = { x: PUZZLE_SIZE - 1, y: PUZZLE_SIZE - 1 };

    // 初始化游戏
    function initGame() {
        createPuzzlePieces();
        shufflePieces();
        renderPieces();
    }

    // 创建拼图碎片
    function createPuzzlePieces() {
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';
        
        for (let y = 0; y < PUZZLE_SIZE; y++) {
            for (let x = 0; x < PUZZLE_SIZE; x++) {
                if (x === PUZZLE_SIZE - 1 && y === PUZZLE_SIZE - 1) continue;
                
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.style.width = `${PIECE_SIZE}px`;
                piece.style.height = `${PIECE_SIZE}px`;
                piece.style.backgroundImage = 'url("img/puzzle.jpg")';
                piece.style.backgroundSize = '400px 400px';
                piece.style.backgroundPosition = `-${x * PIECE_SIZE}px -${y * PIECE_SIZE}px`;
                piece.dataset.originalX = x;
                piece.dataset.originalY = y;
                piece.dataset.currentX = x;
                piece.dataset.currentY = y;
                piece.addEventListener('click', handlePieceClick);
                
                pieces.push(piece);
            }
        }
    }

    // 处理拼图块点击
    function handlePieceClick(e) {
        const piece = e.target;
        const currentX = parseInt(piece.dataset.currentX);
        const currentY = parseInt(piece.dataset.currentY);
        
        if (isAdjacent(currentX, currentY, emptyPosition.x, emptyPosition.y)) {
            swapWithEmpty(piece);
            checkWinCondition();
        }
    }

    // 判断是否相邻
    function isAdjacent(x1, y1, x2, y2) {
        return (Math.abs(x1 - x2) === 1 && y1 === y2) || 
               (Math.abs(y1 - y2) === 1 && x1 === x2);
    }

    // 交换位置
    function swapWithEmpty(piece) {
        const tempX = piece.dataset.currentX;
        const tempY = piece.dataset.currentY;
        
        piece.style.left = `${emptyPosition.x * PIECE_SIZE}px`;
        piece.style.top = `${emptyPosition.y * PIECE_SIZE}px`;
        piece.dataset.currentX = emptyPosition.x;
        piece.dataset.currentY = emptyPosition.y;
        
        emptyPosition = { x: parseInt(tempX), y: parseInt(tempY) };
    }

    // 随机打乱拼图
    function shufflePieces() {
        // 进行100次随机移动
        for (let i = 0; i < 100; i++) {
            const movablePieces = pieces.filter(piece => {
                const x = parseInt(piece.dataset.currentX);
                const y = parseInt(piece.dataset.currentY);
                return isAdjacent(x, y, emptyPosition.x, emptyPosition.y);
            });
            
            if (movablePieces.length > 0) {
                const randomPiece = movablePieces[Math.floor(Math.random() * movablePieces.length)];
                swapWithEmpty(randomPiece);
            }
        }
    }

    // 渲染拼图块
    function renderPieces() {
        pieces.forEach(piece => {
            piece.style.left = `${piece.dataset.currentX * PIECE_SIZE}px`;
            piece.style.top = `${piece.dataset.currentY * PIECE_SIZE}px`;
            document.getElementById('puzzle-board').appendChild(piece);
        });
    }

    // 检查胜利条件
    function checkWinCondition() {
        const isWin = pieces.every(piece => {
            return piece.dataset.currentX === piece.dataset.originalX &&
                   piece.dataset.currentY === piece.dataset.originalY;
        });
        
        if (isWin) {
            document.getElementById('success-message').classList.remove('hidden');
        }
    }

    initGame();
});