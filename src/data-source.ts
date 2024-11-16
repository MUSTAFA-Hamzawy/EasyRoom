import {faker} from "@faker-js/faker/locale/ar";
import {RoomObject} from "./config";

const roomList: RoomObject[] = [];

const amenities: string[] = [
    'TV',
    'WIFI',
    'AC',
    'Heating',
    'Refrigerator',
    'Microwave',
    'Coffee Maker'
];

const roomDescriptions: string[] = [
    "A cozy single room with modern decor, perfect for solo travelers looking for comfort and convenience.",
    "Spacious room with a king-size bed, offering a breathtaking view and premium amenities.",
    "Elegant room with contemporary furnishings, equipped with a work desk and high-speed Wi-Fi for business travelers.",
    "A beautifully designed room with a balcony, perfect for enjoying morning coffee with a serene view.",
    "Bright and airy single room with minimalistic design, offering a calm and relaxing ambiance.",
    "Comfortable double room featuring a flat-screen TV, coffee maker, and plush seating area for unwinding.",
    "Chic and stylish room with vibrant decor, perfect for couples or travelers with a taste for elegance.",
    "Well-equipped room offering modern amenities like a microwave, refrigerator, and a spacious wardrobe for long stays."
];

for (let i = 1; i <= 3; i++) {
    roomList.push({
        roomNumber: i.toString(),
        isAvailable: true,
        roomType: faker.number.int({min: 1, max: 2}),
        pricePerNight: faker.number.float({min: 2, max: 15, fractionDigits: 2}),
        amenities: faker.helpers.arrayElements(amenities),
        description: roomDescriptions[Math.floor(Math.random() * roomDescriptions.length)],
        images: [faker.image.url(), faker.image.url(), faker.image.url()]
    });
}

export default roomList;
