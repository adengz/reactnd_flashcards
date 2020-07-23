# Flash⚡Cards
A simple yet elegant, cross-platform flashcard mobile app built with React Native. The third project from Udacity's React Nanodegree.

## Getting started
First, clone this repository, and install all the dependencies.
```
git clone https://github.com/adengz/reactnd_flashcards.git
cd reactnd_flashcards
yarn install
```

Then, start the development server at http://localhost:19002/.
```
yarn start
```

## Testing
This app has been tested on 
* iOS simulator (iOS 13.6, iPhone SE 2nd generation), may not render proper UI with models of iPhone X and above (those with the notch).
* Android emulator (Android 10.0+, Pixel 3a), and a physical Android device (Android 10, Pixel 2).

## Notable UX issues
* After creating a new deck, the app will navigate to the front page. From there if navigating back, you will end up at the deck creation view, instead of the real home page, deck list view. A solution to potentially solve this is to implement a prompt input instead of a view when creating the new deck.
