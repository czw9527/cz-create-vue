let timer = null
window.addEventListener("scroll", function () {
  document.body.style.pointerEvents = 'none'; // 滚动时禁用鼠标事件
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    document.body.style.pointerEvents = 'auto'; // 释放
  }, 100);
})