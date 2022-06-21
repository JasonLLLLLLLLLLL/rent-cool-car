import { routing } from "../../utils/routing"

// pages/register/register.ts
Page({
  redirectURL:'',
  data: {
    genders:['未知','男','女','其他'],
    licImgURL: "",
    name:' ',
    licNo:' ',
    genderIndex:0,
    birthDate: '2000-01-01',
    state: 'UNSUBMITTED' as 'UNSUBMITTED'|'PENDING'|'VERIFIED'
  },

  // 这个opt可以接收前面url跳转带来的参数
  onLoad(opt: Record<'redirect', string>) {
    const o : routing.RegisterOpts = opt
    if(o.redirect) {
      this.redirectURL = decodeURIComponent(opt.redirect)
    }
  },
  onUpLoadLic() {
    wx.chooseImage({
      success: res => {
        if (res.tempFilePaths.length > 0) {
          this.setData({
            licImgURL: res.tempFilePaths[0]
          })
          setTimeout(() => {
            this.setData({
              licNo:'3412412412',
              name: '张三',
              genderIndex: 1,
              birthDate:'1980-01-02'
              }  
            )
          })
        }
      },
    })
  },
  onGenderChange(e:any) {
    console.log(e.detail.value)
    this.setData({
      genderIndex: e.detail.value
    })
  },
  onbirthDateChange(e: any) {
    this.setData({
      birthDate: e.detail.value
    })
  },
  onSubmit() {
    this.setData({
      state:'PENDING'
    })
    setTimeout(() => {
      this.onLicVerified()
    }, 3000)
  },
  onLicVerified() {
    this.setData({
      state:'VERIFIED',
    })
    if (this.redirectURL) {
      wx.redirectTo({
        url: this.redirectURL,
      })
    }
  }
  ,
  onResubmit() {
    this.setData({
      state:'UNSUBMITTED',
      licImgURL:' ',
    })
  }

  

})