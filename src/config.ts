import * as protoLoader from "@grpc/proto-loader";

export const PORT: string = '50051';
export const HOST: string = 'localhost';

export const protoLoaderOptions: protoLoader.Options = {
    keepCase: true,
    longs: String,  // to treat long numbers as string
    enums: String,
    defaults: true,
    oneofs: true,
}

export interface RoomObject {
    roomNumber : string,
    isAvailable : boolean,
    roomType : number,
    pricePerNight : number,
    amenities : string[],
    description : string,
    images : string[]
}