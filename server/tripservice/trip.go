package trip

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"fmt"
)

type Serivce struct {
}

// 实现了Response的接口
// 他既然是一个服务，就要有上下文，所以第一个参数是一个context
// 这边写的是客户端的具体内容？
func (*Serivce) GetTrip(c context.Context, req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	fmt.Println("在这儿写具体的服务")
	return &trippb.GetTripResponse{Id: req.Id + "111s"}, nil
}
