# Hotel Reservation

Welcome to the Hotel Reservation System mobile application built with React Native! This app offers essential features for a seamless hotel reservation experience, enabling users to explore available rooms, book accommodations, and effortlessly manage their reservations.

## Getting Started

Follow the steps below to set up and run the your locally:

### Prerequisites

Before you can run this project, you will need to install the following development tools:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed on your computer.
- [npm](https://www.npmjs.com/): npm is usually included with Node.js, but you can check if it's installed by running `npm -v` in your terminal.
- [Android Studio](https://developer.android.com/studio): If you plan to run the app on an Android emulator or physical device, you will need to install Android Studio.
- Expo Go: Expo Go is a mobile app that allows you to run Expo projects directly on your device. Follow the steps below to install Expo Go:

  - [For iOS](https://apps.apple.com/app/apple-store/id982107779): Visit the App Store and search for "Expo Go" or use the provided link to download Expo Go on your iOS device.

  - [For Android](https://play.google.com/store/apps/details?id=host.exp.exponent): Visit the Google Play Store and search for "Expo Go" or use the provided link to download Expo Go on your Android device.

- [Ngrok](https://ngrok.com/): Ngrok is a software that allows us to open our applications that we run on localhost on our own computer, over the cloud, under the xxx.ngrok.io sub-domain. Follow the steps below to install Ngrok:

  1. Visit the Ngrok website: [https://ngrok.com/](https://ngrok.com/)

  2. Sign up for a free account.

  3. Download and install Ngrok on your machine by following the instructions on the Ngrok website.
 
  or
  
      npm i ngrok

Once you have installed these tools, you will be ready to run the project on your local machine or mobile device.

## Installation

Clone the repository to your local machine:

      git clone https://github.com/emreaknci/HotelReservationApp.git

Navigate to the project directory:

      cd HotelReservationApp

Install the required dependencies:

      npm install

## Configuration

### Ngrok Usage

To expose your locally running backend ([this project's server](https://github.com/emreaknci/HotelReservation) runs on port 5169 by default) to the internet using Ngrok, follow these steps:

1. Run the following command in your terminal:

    ```bash
    ngrok http 5169
    ```

   This command will generate a public URL (e.g., `https://3ab7-78-174-64-137.ngrok-free.app`) that redirects to your local backend running on port 5169.

2. Copy the Ngrok URL generated in the terminal.

3. Paste the Ngrok URL as the value of `EXPO_PUBLIC_API_URL` in your project's `.env` file. Make sure there are no leading or trailing spaces. For example:

    ```plaintext
    EXPO_PUBLIC_API_URL=https://3ab7-78-174-64-137.ngrok-free.app
    ```

Now the connection with the client is ensured! Don't forget to start the backend project as well. ([Click to download backend](https://github.com/emreaknci/HotelReservation))

## Run the Application


Start the application:

    npx expo start 

## Contributing
I welcome contributions! If you find a bug or have a feature request, please open an issue. If you would like to contribute code, please fork the repository and create a pull request.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)

## Authors

[@emreaknci](https://www.github.com/emreaknci)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/emreaknci/)
