import { routing } from "../../utils/routing"

// pages/driving/driving.ts
const centPerSec = 1


// 全局函数带着function声明的都写在外边
// 带上export就可以给其他文件使用了
function formatFee(cents: number) {
  // 保留两位小数
  return (cents/100).toFixed(2)
}
function formatDuration(sec: number) {
  // 写法和调用都很有意思，函数当成变量去使用
  const padString = (n: number) =>
    n < 10 ? '0' + n.toFixed(0) : n.toFixed(0)
  const h =Math.floor( sec/3600)
  sec -= 3600 * h
  const m = Math.floor(sec/60)
  sec -= 60 *m
  const s = Math.floor(sec)
  return `${padString(h)}:${padString(m)}:${padString(s)}`
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: undefined as number | undefined,
    location: {
      latitude: 32.92,
      longitude: 118.46,
    },
    scale: 14,
    elapsed: '00:00:00',
    fee: '0.00'
  },
  // opt可以拿url传来的参数 ?
  // Record类似于接口限制 ?
  onLoad(opt: Record<'trip_id', string> ) {
    // o 是 routing.DrivingOpt类型
    const o : routing.DrivingOpts = opt
    console.log('current trip', opt.trip_id)
    this.setupLocationUpdator()
    this.setupTimer()
  },

  onUnload() {
    wx.stopLocationUpdate()
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
  },

  setupLocationUpdator() {
    wx.startLocationUpdate({
      fail:console.error,
    })
    wx.onLocationChange(loc => {
      console.log('location: ', loc)
      this.setData({
        location: {
          latitude: loc.latitude,
          longitude: loc.longitude
        }
      })
    })
  },



  setupTimer() {
    let elapsedSec = 0
    let cents = 0
    this.data.timer = setInterval(() => {
      elapsedSec ++
      cents += centPerSec
      this.setData({
        elapsed: formatDuration(elapsedSec),
        fee: formatFee(cents)
      })
    }, 1000)
  }
})