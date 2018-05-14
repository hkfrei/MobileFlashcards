# Mobile Flashcards

This app allows to study collections of flashcards. Users are able to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks. It has only been tested on the **IOS** platform and is therefore optimized for it.

## Prerequisites

The project needs the package manager [Node](https://nodejs.org/en/) or [Yarn](https://yarnpkg.com/).

## Getting Started

Clone this project to your local machine...

```
git clone https://github.com/hkfrei/MobileFlashcards.git
```

Enter the newly created 'MobileFlashcards' folder

```
cd MobileFlashcards
```

## Installation

While in the _MobileFlashcard_ folder, you need to install all the dependencies for the project.
This can be done by running....

```zsh
yarn install
```

or

```zsh
npm install
```

## Running the app on your local machine

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

```zsh
yarn start
```

Runs your app in development mode.

After you get prompted for a choice where to run the app, type **i** to run it in the iOS Simulator if you're on a Mac and have it installed (via Xcode).
otherwise you can also open it in the [Expo app](https://expo.io) on your phone.

In both cases it will reload if you save edits to your files, and you will see build errors and logs in the terminal. For this to work properly, your phone needs to be in the same network as your development machine.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

```zsh
yarn test
```

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

```zsh
yarn run ios
```

Like `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

```zsh
yarn run android
```

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

## Coding style

The code was formatted using the [prettier](https://prettier.io/) code formatter and it's default settings.

## Built With

* This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Contributing

This is just a project for completing the React course at Udacity. Contributing is not possible.

## Authors

* Hanskaspar Frei

## Acknowledgments

* [React Community](https://github.com/react-community/create-react-native-app) for starter template.
* [prettier](https://prettier.io/) the awesome code formatter.

## License

* [MIT](https://github.com/hkfrei/MobileFlashcards/blob/master/LICENSE)
