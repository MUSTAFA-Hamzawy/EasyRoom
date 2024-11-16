import * as grpc from "@grpc/grpc-js";
import roomsData from "./data-source";
import {RoomObject} from "./config";

const data = roomsData;

/**
 * RoomServiceHandlers is a class that provides the implementation of the gRPC service methods
 * for handling room-related operations, such as listing available rooms, getting room details,
 * adding rooms, booking rooms, and checking room availability.
 */
export class RoomServiceHandlers {

    /**
     * Handles the 'ListAvailableRooms' gRPC method.
     * Filters the rooms data to return only the rooms that are available.
     *
     * @param _ - The UnaryCall request object (not used here)
     * @param callback - The callback function to send the response
     */
    public static listAvailableRooms(_: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
        const roomList = data.filter(room => room.isAvailable);
        callback(null, {roomList: roomList, message: 'Data retrieved successfully.'});
    };

    /**
     * Handles the 'GetRoomDetails' gRPC method.
     * Retrieves the details of a specific room based on the room number provided.
     * If no room number is provided or the room cannot be found, it sends an error response.
     *
     * @param call - The UnaryCall request object containing the room number
     * @param callback - The callback function to send the response
     */
    public static getRoomDetails(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
        if (call.request.roomNumber == '') callback(null, {
            room: {},
            message: 'Please provide the room number.'
        });

        const room = data.find(room => room.roomNumber == call.request.roomNumber);

        if (!room) callback({
            code: grpc.status.NOT_FOUND,
            details: 'Room not found',
        });
        else callback(null, {room: room, message: 'Room retrieved successfully.'});
    }

    /**
     * Handles the 'AddRoom' gRPC method.
     * Adds a new room to the data source if the room number does not already exist.
     * If the room number already exists, it sends an error response.
     *
     * @param call - The UnaryCall request object containing the new room details
     * @param callback - The callback function to send the response
     */
    public static addRoom(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
        const isExist: any = data.find(room => room.roomNumber == call.request.roomNumber);
        if (!isExist){
            const newRoom: RoomObject = call.request;
            data.push(newRoom);
            callback(null, {room: newRoom, message: 'Room added successfully.'});
        }
        else callback({
            code: grpc.status.CANCELLED,
            details: 'Room number taken before.',
        });
    }

    /**
     * Handles the 'BookRoom' gRPC method.
     * Books a room if it is available, marking it as unavailable in the data source.
     * If the room is not found or is not available, it sends an error response.
     *
     * @param call - The UnaryCall request object containing the room number to book
     * @param callback - The callback function to send the response
     */
    public static bookRoom(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
            const room = data.find(room => room.roomNumber == call.request.roomNumber);

            if (!room) callback({
                code: grpc.status.NOT_FOUND,
                details: 'Room not found',
            });
            else if(!room.isAvailable) callback({
                code: grpc.status.NOT_FOUND,
                details: 'Room not available',
            });
            else {
                data.map((rm) => {
                    if (rm.roomNumber == room.roomNumber) rm.isAvailable = false;
                });
                callback(null, {message: 'Room booked successfully.'});
            }
    }

    /**
     * Handles the 'CheckRoomAvailability' gRPC method.
     * Checks if a room is available based on the room number provided.
     * Returns the availability status of the room.
     *
     * @param call - The UnaryCall request object containing the room number
     * @param callback - The callback function to send the response
     */
    public static checkRoomAvailability(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
        const room = data.find(room => room.roomNumber == call.request.roomNumber);

        if (!room) callback({
            code: grpc.status.NOT_FOUND,
            details: 'Room not found',
        });
        else callback(null, {availability: room.isAvailable});
    }
}