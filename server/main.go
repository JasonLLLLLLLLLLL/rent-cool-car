package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	trip "coolcar/tripservice"
	"log"
	"net"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	log.SetFlags(log.Lshortfile)
	//
	go startGRPCGateway()
	// 1. 起服务：监听端口
	lis, err := net.Listen("tcp", ":8081")
	//
	if err != nil {
		// 失败了就返回
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()

	trippb.RegisterTripServiceServer(s, &trip.Serivce{})
	log.Fatal(s.Serve(lis))
}

func startGRPCGateway() {
	c := context.Background()
	// 在这个环境里连接了后端的服务，环境又取消连接的功能
	c, cancel := context.WithCancel(c)
	defer cancel()
	// 配置前后端字段的格式
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard, &runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseEnumNumbers: true,
			},
		},
	))

	err := trippb.RegisterTripServiceHandlerFromEndpoint(
		c,
		mux,
		":8081",
		[]grpc.DialOption{grpc.WithInsecure()},
	)
	if err != nil {
		log.Fatalf("cannot start grpc gateway: %v", err)
	}
	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatalf("cannnot listen and serve: %v", err)
	}

}
