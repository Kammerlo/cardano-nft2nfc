**Disclaimer** This project is currently still under development. I'm working on this in my spare time, so it will take some time to finish it.

# Cardano NFT-to-NFC
This project aims provide an easy to use webapp to write NFT to NFC Chips.
This way it will be possible to mark physical objects with these NFC chips to prove that it's yours.
Since you can scan the object it will link to an NFT which was minted into your wallet.
A demo application can be found here: [Cardano NFT-to-NFC Firebase](https://cardano-nft-to-nfc.web.app/)

Normally I'm a java developer, but wanted to refresh my Typescript skills, and so I came up with this Idea.

### How to build
This project is splitted into frontend and Backend. The frontend was build using Vue + React and the backend is NodeJs.
A backend is needed since some libraries can't run in the frontend e.g. the NFC Writer and Blockfrostlib.

Copy the .env.example file to .env and fill in the needed values.
```shell
cp .env.example .env
```

To start the project you just need to run the following commands:
```shell
yarn dev
```
This will start the frontend and backend in development mode.
To build the project you can run:
```shell
yarn build
```
This will generate all sources and put them into the dist folder.

### Firebase deploy
Since all static files are generated into the dist folder, you can deploy the frontend to firebase hosting or wherever you want.
I used firebase, since it's easy to use and free for small projects.
To deploy the application to firebase you need to run the following commands:
```shell
npm install -g firebase-tools # to install the firebase tools
firebase login # to login to your firebase account
firebase init # to initialize the project choose hosting and select the dist folder
firebase deploy # to deploy the project
```

Afterwards you should be able to access the frontend via the firebase hosting url.

# ToDos List
This project is under development and still a lot of stuff todo to reach the first release.
I'm developing this in my spare time, so it can take some time until it's finished.

ToDos:
- [x] Implement NFT minting
- [ ] Implement NFC writing
- [X] Implement validty proof
- [ ] Refactor code (since at some place I chose some cumbersome solutions to get it running, so I'm aware of that :) )
- [X] Deploy test instance
- [ ] Documentation