// pages/lock/lock.ts

import { routing } from "../../utils/routing"

const shareLocationKey = "share_location"

Page({
  data: {
    shareLocation: false,
    avaterURL: '',
  },
  async onLoad(opt) {
    // 既然要去开锁了，就得知道car_id
    console.log('unlocking car', opt.car_id)
    this.setData({
      shareLocation: wx.getStorageSync(shareLocationKey) || false
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用户获取用户头像',
      success: (res) => {
        console.log(res.userInfo.avatarUrl)
        this.setData({
          avaterURL: res.userInfo.avatarUrl
        }),
          console.log(getApp().globalData)
      }
    })
  },
  onShareLocation(e: any) {
    const shareLocation: boolean = e.detail.value
    //  缓存
    wx.setStorageSync(shareLocationKey, shareLocation)
  },

  onUnlockTap() {
    wx.getLocation({
      type: 'gcj02',
      success: loc => {
        console.log('starting a trip', {
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude
          },
          // TODO:双向绑定
          avatarUrl: this.data.shareLocation ? this.data.avaterURL : '',
        })
        const tripID = 'trip456'
        wx.showLoading({
          title: '开锁中',
          mask: true
        })
        setTimeout(() => {
          wx.redirectTo({
            // 通过url，实现数据的跨页面传输 
            // url: `/pages/driving/driving?trip_id=${tripID}`,
            url: routing.driving({
              trip_id: tripID
            }),
            complete: () => {
              wx.hideLoading
            }
          })
        }, 2000)
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请前往设计页面授权位置信息'
        })
      }
      
    })
    

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})