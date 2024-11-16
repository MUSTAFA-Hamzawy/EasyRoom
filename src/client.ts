import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { PORT, HOST, protoLoaderOptions } from './config';
import path from 'node:path';
import * as readline from 'readline';
import {room} from './add-room';

// configurations
const PROTO_PATH: string = path.join(__dirname, 'easy-room.proto');
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// initialize the services
const roomPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderOptions);
const roomsProto: any = grpc.loadPackageDefinition(roomPackageDefinition);

// creating client instance
const client = new roomsProto.EasyRoom(`${HOST}:${PORT}`, grpc.credentials.createInsecure());

function promptUser() {
    console.log('\n\n================');
    console.log('\n\nPlease choose an option:');
    console.log('1. List Available Rooms');
    console.log('2. Get Room Details');
    console.log('3. Add Room');
    console.log('4. Book Room');
    console.log('5. Check Room Availability');

    readLine.question('Enter the number of the operation you want to perform: ', (choice: string) => {
        switch(choice) {
            case '1':
                client.ListAvailableRooms({}, (error: grpc.ServiceError | null, response: any) => {
                    if (error) {
                        console.error('Error:', error.message);
                    } else {
                        console.log('Response:', JSON.stringify(response, null, 2));
                    }
                    promptUser();
                });
                break;
            case '2':
                readLine.question('Enter room number: ', (roomNumber: string) => {
                    client.GetRoomDetails({ roomNumber }, (error: grpc.ServiceError | null, response: any) => {
                        if (error) {
                            console.error('Error:', error.message);
                        } else {
                            console.log('Room Details:', JSON.stringify(response, null, 2));
                        }
                        promptUser();
                    });
                });
                break;
            case '3':
                client.AddRoom(room, (error: grpc.ServiceError | null, response: any) => {
                    if (error) {
                        console.error('Error:', error.message);
                    } else {
                        console.log('Response:', JSON.stringify(response, null, 2));
                    }
                    promptUser();
                });
                break;
            case '4':
                readLine.question('Enter room number: ', (roomNumber: string) => {
                    client.BookRoom({ roomNumber }, (error: grpc.ServiceError | null, response: any) => {
                        if (error) {
                            console.error('Error:', error.message);
                        } else {
                            console.log('Response:', JSON.stringify(response, null, 2));
                        }
                        promptUser();
                    });
                });

                break;
            case '5':
                readLine.question('Enter room number: ', (roomNumber: string) => {
                    client.CheckRoomAvailability({ roomNumber }, (error: grpc.ServiceError | null, response: any) => {
                        if (error) {
                            console.error('Error:', error.message);
                        } else {
                            console.log('Response:', JSON.stringify(response, null, 2));
                        }
                        promptUser();
                    });
                });
                break;
            default:
                console.log('Invalid choice, please try again.\n\n');
                promptUser();
        }
    });
}
promptUser();
