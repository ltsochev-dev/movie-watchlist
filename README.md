# Movie Watchlist App

A movie watchlist app that I built in my free-time that helped me get introduced to Google's Firebase services such as Firestore and Auth.
It's built using VueJS 3, Vite (for speed and efficiency), Bootstrap 5 (styles-only to cut on bundle size), SASS for styling and Firebase SDK v9.

The goal of the project was to have a near real-time watchlist synchronization between authorized clients.

It is a very rushed proof-of-concept project that I made for myself to check out Firebase's functionality.

You are free to use any parts of the code as you see fit.

## Installation

Before installation, keep in mind that you need to have a Firebase account credentials.

Execute the following commands in order:

```
git clone git@github.com:ltsochev-dev/movie-watchlist.git
cd movie-watchlist
npm install
cp .env.example .env
```

Fill the `.env` file with your proper Firebase credentials.

After dependency installation, you'll have to use Firebase CLI to connect your console with Firebase by using the following command

```
firebase-tools init
```

On this step you have to select Firestore and even hosting services if you prefer to enable Firebase hosting

Once you are done with dependencies and configuration you can start the app in debug mode by running

```
npm run dev
```

Which would launch Vite with hot-reload functionality or you can simply build the app by running the `build` command

```
npm run build
```

All files will be moved into the `dist` folder.

If you have configured Firebase hosting properly you should be able to deploy your project simply by running

```
npm run deploy
```

### ToDo's

- Route change transition animations
- Preloaders for when we're loading remote information
- Add more authentication providers
