import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {GrpcObject, ServiceClientConstructor} from "@grpc/grpc-js";
import {PORT, HOST, protoLoaderOptions} from "./config";
import path from "node:path";
import {RoomServiceHandlers} from "./room.services";
const PROTO_PATH: string = path.join(__dirname, 'easy-room.proto');

// server config
const roomPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderOptions);
const roomsProto: GrpcObject = grpc.loadPackageDefinition(roomPackageDefinition);
const EasyRoomService = roomsProto.EasyRoom as ServiceClientConstructor;


const server = new grpc.Server();

// registering the service methods with their corresponding handler functions
server.addService(EasyRoomService.service, {
    ListAvailableRooms : RoomServiceHandlers.listAvailableRooms,
    GetRoomDetails : RoomServiceHandlers.getRoomDetails,
    AddRoom : RoomServiceHandlers.addRoom,
    BookRoom : RoomServiceHandlers.bookRoom,
    CheckRoomAvailability : RoomServiceHandlers.checkRoomAvailability
} );

// starting the server
server.bindAsync(
    `${HOST}:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log(`Server running at ${HOST}:${PORT}`);
    }
);