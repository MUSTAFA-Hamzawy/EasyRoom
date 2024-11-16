import {RoomObject} from "./config";
import {faker} from "@faker-js/faker";


export const room : RoomObject = {
    roomNumber: '5',
    isAvailable: true,
    roomType: 2,
    pricePerNight: 15.6,
    amenities: ['TV', 'WIFI'],
    description: 'Room description',
    images: [faker.image.url(), faker.image.url(), faker.image.url()]
}