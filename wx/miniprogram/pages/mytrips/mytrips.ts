import { routing } from "../../utils/routing"

interface Trip {
  id: string
  start: string
  end: string
  duration: string
  fee: string
  distance: string
  status: string
}

interface MainItem {
  id: string
  navId: string
  navScrollId: string
  data: Trip
}



interface NavItem {
  id: string
  mainId: string
  label: string
}
// 限制MainItemQueryResult应该有这些东西
interface MainItemQueryResult {
  id: string
  top: number
  dataset: {
    navId: string
    navScrollId: string
  }
}

// pages/mytrips/mytrips.ts
Page({

  /**
   * 页面的初始数据
   */
  scrollStates: {
    mainItems: [] as MainItemQueryResult[],
  },
  data: {
  
    promotionItems: [
      {
        img: 'https://img.mukewang.com/5f7301d80001fdee18720764.jpg',
        promotionID: 1,
      },
      {
        img: 'https://img.mukewang.com/5f6805710001326c18720764.jpg',
        promotionID: 2,
      },
      {
        img: 'https://img.mukewang.com/5f6173b400013d4718720764.jpg',
        promotionID: 3,
      },
      {
        img: 'https://img.mukewang.com/5f7141ad0001b36418720764.jpg',
        promotionID: 4,
      },
    ],
    avatarURL: '',
    tripsHeight: 0,
    navCount: 0,
    mainScroll: '',
    navItems: [] as NavItem[],
    mainItems: [] as MainItem[],
    navSel: '',
    navScroll: '',
    // 值是空的，类型是Trip[]
    trips: [] as Trip[],
    scrollTop:0,
    scrollIntoView:''
  },
  async onLoad() {
    this.populateTrips()
  },
  onNavItemTap(e: any) {
    const mainId: string = e.currentTarget?.dataset?.mainId
    const navId: string = e.currentTarget?.id
    console.log('here')
    if (mainId && navId) {
        this.setData({
            mainScroll: mainId,
            navSel: navId,
        })
        console.log(this.data.mainScroll,this.data.navSel)
    }
},
onReady() {
  // 所有的东西都是有变量来去获取的
  wx.createSelectorQuery().select('#heading')
    .boundingClientRect(rect=>{
      const height = wx.getSystemInfoSync().windowHeight - rect.height
      this.setData({
        tripsHeight: height+100,
        navCount: Math.round(height/50)
      })
    }).exec()  
},


  populateTrips() {
    const mainItems: MainItem[] = []
    const navItems: NavItem[] = []
    let navSel = ''
    let prevNav = ''

    for (let i = 0; i < 100; i++) {
      const mainId = 'mian-' + i
      const navId = 'nav-' + i
      if (!prevNav) {
        prevNav =navId
      }
      mainItems.push({
        id: mainId,
        navId: navId,
        navScrollId: prevNav,
        data: {
          id: (10001+i).toString(),
          start: '东方米宫主',
          end: 'disney',
          distance:'27km',
          duration:'0时44分',
          fee:'128.00元',
          status: '已完成'
        }
      }),
      navItems.push({
        id: 'nav-' + i,
        mainId: 'main-'+i,
        label:(10001+i).toString(),
      })
      if(i === 0 ) {
        navSel = navId
      }
      prevNav = navId
    } 

    this.setData({
      mainItems,
      navItems,
      navSel
    }, ()=>{
      this.prepareScrollStates()
    })
  },
  prepareScrollStates() {
    wx.createSelectorQuery().selectAll('.main-item')
      .fields({
          id: true,
          dataset: true,
          rect: true
    }).exec( res => {
      this.scrollStates.mainItems = res[0]
    })
  },
  onRegisterTap() {
    wx.navigateTo({
      url: routing.register()
    })
  },
  onMainScroll(e: any) {
    console.log(e)
    const top:number= e.currentTarget?.offsetTop + e.detail.scrollTop
     if (top === undefined) {
       return
     }
     const selItem =  this.scrollStates.mainItems.find( v => v.top >= top)
     if (!selItem) {
       return 
     }
     this.setData({
       navSel: selItem.dataset.navId,
       navScroll: selItem.dataset.navScrollId
     })
    }
})