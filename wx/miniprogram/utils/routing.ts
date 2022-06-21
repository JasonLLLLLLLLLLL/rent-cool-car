// ** 将所有的拼路径都集中在此，确保路径只拼一次
// 1. 当前文件夹里的函数在外边引用的时候要加 routing.
// 2. 跟外面说怎么调用 
export namespace routing {
  
  // 3. 对于DrivingOpts，他要有一个.trip_id
  export interface DrivingOpts {
    trip_id: string
  }
  // 4. 
  export function driving(o: DrivingOpts) {
    return `/pages/driving/driving?trip_id=${o.trip_id}`
  }
  export interface LockOpts {
    car_id: string
  }
  export function lock(o: LockOpts) {
    return `/pages/lock/lock?car_id=${o.car_id}`
  }
// 限制一种新的类型，可以使得RegisterOpt.redirect调用
  export interface RegisterOpts {
    redirect ?: string
  }
  export interface RegisterParams {
    redirectURL: string
  }
  export function register(p? : RegisterParams) {
    const page = '/pages/register/register'
    // 不带参数的时候
    if (!p) {
      return page 
    }
    return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`
  }
  // 停下来理一理，会舒服很多，也会更能继续下去
  export function mytrips() {
    return '/pages/mytrips/mytrips'
  }
}

