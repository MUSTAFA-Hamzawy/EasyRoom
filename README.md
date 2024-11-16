<br/>
<h1 align="center">EasyRoom</h1>
<p align="center">
EasyRoom is a lightweight gRPC-based service for managing room bookings.<br>
It provides essential functionalities such as listing available rooms, getting room details, booking rooms.
<br/>
</div>

<br/>

## Table Of Contents

- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)

## Features
- <strong>ListAvailableRooms:</strong> Filters the rooms data to return only the rooms that are available.
- <strong>GetRoomDetails:</strong> Retrieves the details of a specific room based on the room number provided.
- <strong>AddRoom:</strong> Adds a new room based on data of the file "src/add-room.ts".
- <strong>BookRoom:</strong> Books a room if it is available.
- <strong>CheckRoomAvailability:</strong> Checks if a room is available based on the room number provided.

## Built With

* NodeJS
* TypeScript
* grpc-js
* proto-loader
* yarn

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* NodeJS
* npm or yarn

### Installation

### Clone the repo
  
  ```sh
git clone https://github.com/MUSTAFA-Hamzawy/EasyRoom.git
  ```

then, Move to the project directory

  2. Install dependecies
  
  ```sh
npm install
  ```
  
  3. Start Running the server
  ```sh
npm run server
  ```
  
  3. Start Running the clients ( different terminals )
  ```sh
npm run client
  ```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/MUSTAFA-Hamzawy/EasyRoom/issues/new) to discuss it, or
-  Directly create a pull request after you edit the files with necessary changes.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
