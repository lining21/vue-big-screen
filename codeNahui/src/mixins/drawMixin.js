// 屏幕适配 mixin 函数

// * 默认缩放值
const scale = {
  width: '1',
  height: '1',
}

// * 设计稿尺寸（px）
const baseWidth = 1920
const baseHeight = 1080

// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

export default function () {
  let innerAppRef = null
  const calcRate = (appRef) => {
    if (!appRef.value) return
    if (!innerAppRef) { innerAppRef = appRef }
    // 当前宽高比
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (appRef.value) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      } else {
        // 表示更高
        scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
    }
  };

  let drawTiming = null;
  const resize = () => {
    clearTimeout(drawTiming)
    drawTiming = setTimeout(() => {
      innerAppRef && calcRate(innerAppRef)
    }, 200)
  };

  /**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
const formatTime = (time, fmt) => {
  if (!time) return '';
  else {
    const date = new Date(time);
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt;
  }
}

  return {
    calcRate,
    resize,
    formatTime
  }
}