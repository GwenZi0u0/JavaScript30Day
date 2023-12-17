// 宣告變數
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('.player__button[data-skip]');
// 函式

// 調整音量
function changeVolume() {
    video.volume = ranges[0].value;
}

// 調整速度
function changePlayBackRate() {
    video.playbackRate = ranges[1].value;
}

// 快轉
function skip() {
    // parseFloat() 字串轉換為以十進位表示的浮點數 僅接受一個參數
    // dataset - 撈出所有 data- 開頭屬性的值，並且回傳成一個物件格式。
    video.currentTime += parseFloat(this.dataset.skip);
}

// 更新進度條
function updataProgressBar() {
    // 當前時間
    const currentTime = video.currentTime;

    // 持續時間
    // console.log((video.currentTime / video.duration * 100));
    progressBar.style.flexBasis = (video.currentTime / video.duration) * 100 + "%";

    // 重播
    if (currentTime == video.duration) {
        toggle.textContent = " ↩";
    }
}

// 點擊進度條跳轉(seek)播放位置
function seek(e) {
    const clickX = e.clientX - progress.getBoundingClientRect().left;
    const progressBarWidth = progress.clientWidth;
    const seekTime = (clickX / progressBarWidth) * video.duration;
    video.currentTime = seekTime;
    progressBar.style.flexBasis = (clickX / progressBarWidth) * 100 + "%";
}

// 影片播放 暫停
function togglePlay() {
    if (video.paused) {
        toggle.textContent = "❚❚"
        video.play();
    } else {
        toggle.textContent = "►"
        video.pause();
    }
    // 反向
    video.paused = !video.paused;
}


// 監聽影片timeupdata事件,並更新進度條
video.addEventListener('timeupdate', updataProgressBar);
// 點擊進度條
progress.addEventListener('click', seek);
// 點擊事件 執行togglePlay
toggle.addEventListener('click', togglePlay);
// 調整音量
ranges[0].addEventListener('input', changeVolume);
// 調整速度
ranges[1].addEventListener('input', changePlayBackRate);
// 快轉
skipButtons[0].addEventListener('click', skip);
skipButtons[1].addEventListener('click', skip);
