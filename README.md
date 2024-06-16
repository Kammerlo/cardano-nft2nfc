**Disclaimer** This project is currently still under development. I'm working on this in my spare time, so it will take some time to finish it. 

# Cardano NFT-to-NFC
This project aims provide an easy to use webapp to write NFT to NFC Chips. 
This way it will be possible to mark physical objects with these NFC chips to prove that it's yours. 
Since you can scan the object it will link to an NFT which was minted into your wallet. 

Normally I'm a java developer, but wanted to refresh my Typescript skills, and so I came up with this Idea.

## How to build
This project is splitted into frontend and Backend. The frontend was build using Vue + React and the backend is NodeJs. 
A backend is needed since some libraries can't run in the frontend e.g. the NFC Writer and Blockfrostlib.

To start the frontend:
```npm run dev```
To start the backend:
- Copy `.env` File, rename to `.env.local` and fill it with your values 
- ```npm run dev-node```

# ToDos List
This project is under development and still a lot of stuff todo to reach the first release. 
I'm developing this in my spare time, so it can take some time until it's finished.

ToDos:
- [x] Implement NFT minting
- [ ] Implement NFC writing
- [ ] Implement validty proof
- [ ] Refactor code (since at some place I chose some cumbersome solutions to get it running, so I'm aware of that :) )
- [ ] Deploy test instance
- [ ] Documentation