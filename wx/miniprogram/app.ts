import camelcaseKeys from "camelcase-keys"
import { IAppOption } from "./appoption"
import { coolcar } from "./service/proto_gen/trip_pb"

let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void
// app.ts
App<IAppOption>({
  globalData: {
  },
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.request({
      url: 'http://localhost:8080/trip/trip123',
      method: 'GET',
      success: res => {
        const getTripResp = coolcar.GetTripResponse.fromObject(camelcaseKeys( res.data as object))
        console.log(getTripResp)
        console.log('status is', coolcar.TripStatus[getTripResp.trip?.status!])
      },
      fail: console.error, 
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // openid对应一个用户
        // 
      },
    })
  }, 
})