// 宣告變數
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
// 函式


// 更新進度條
function updataProgressBar() {
    // 當前時間
    const currentTime = video.currentTime;
    // 持續時間
    const duration = video.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    const hue = (currentTime / duration) * 120;
    progress.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
}
// 點擊進度條跳轉播放位置
function seek(e) {
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickX / progressBarWidth) * video.duration;
    video.currentTime = seekTime;
}
// 影片播放 暫停
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    video.paused = !video.paused;
}

// 監聽影片timeupdata事件,並更新進度條
video.addEventListener('timeupdata', updataProgressBar);
// 點擊進度條
progress.addEventListener('click', seek);
// 點擊事件 執行togglePlay
toggle.addEventListener('click', togglePlay);
