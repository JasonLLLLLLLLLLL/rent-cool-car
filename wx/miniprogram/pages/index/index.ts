import { routing } from "../../utils/routing"

Page({
  isPageShowing: false,
  avatarURL:'',
 data: {
   setting: {
    skew: 0,
    rotate: 0,
    showLocation: false,
    showScale: false,
    subKey: '',
    layerStyle: -1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: false,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
   },
   location: {
    latitude: 30,
    longitude: 103,
   },
   scale: 7,
   markers:[
     {
      id: 1,
      latitude: 30.5,
      longitude: 104
     },
     {
      iconPath: "../resources/car.png",
      id: 1,
      latitude: 30.5,
      longitude: 104,
      width: "20",  
      height: "20"  
    },
     {
       id: 2,
       latitude: 31,
       longitude: 105,
       width: "20",  
       height: "20"  
     }
    ]
 },
 onMyTripsTap() {
  wx.navigateTo({
    url:routing.mytrips()
  })
 },
  onLoad() {
  const userInfo =  getApp<IAppOption>().globalData.userInfo
  // 接着异步？
  this.setData({
    avatarURL : userInfo?.avatarUrl
  }),
  console.log(userInfo)
 },
 onMyLocationTap() {
   wx.getLocation({
     type: 'gcj02',
     success: res => {
       this.setData({
         location: {
           latitude: res.latitude,
           longitude: res.longitude
         }
       })
     },
     fail: () => {
       wx.showToast({
         icon: 'none',
         title: '请前往设置页授权'
       })
     } 
   })
 },
onShow() {
  this.isPageShowing = true;
},
onHide() {
  this.isPageShowing = false;
},
onScanTap() {
  wx.scanCode({
    success: () => {
      const carID='car123'
      
      // 参数的传递方式
      const redirectURL = routing.lock({
        car_id: carID
      })

      wx.navigateTo({
        // url: `../register/register?redirect=${encodeURIComponent(redirectURL)} `,
        url: routing.register({redirectURL: redirectURL})
      })
    },
    fail: console.error
  })
},
 moveCars() {
   // 获得map的对象，参数是map id
   const map = wx.createMapContext("map")
   const dest = {
     latitude: 30.5,
     longitude: 104
   }
   const moveCar = () => {
    dest.latitude += 1
    dest.longitude += 1
    map.translateMarker({
      destination:{
       latitude: dest.latitude,
       longitude: dest.longitude,
      },
      markerId: 1,
      autoRotate: false,
      rotate: 0,
      duration: 5000,
      animationEnd: () => {
        if (this.isPageShowing) {
          moveCar()
        }
      },
      
    })
   }
   moveCar()
  }
})
