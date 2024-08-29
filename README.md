# Tic-Tac-Toe Game

## Overview

This project is a straightforward implementation of the classic Tic-Tac-Toe game, meant as a personal refresher in modern web development tools and practices. The focus was on revisiting and solidifying my understanding of React, TypeScript, React Query, and Socket.io. The application features both single-player and multiplayer modes, providing a practical way to explore real-time communication and state management in a React-based environment.

## Features

- **Single Player Mode**: Play against an unbeatable AI opponent.
- **Multiplayer Mode**
  - Create and join rooms.
  - Password-protected rooms.
  - Real-time gameplay via Socket.io.
  - Responsive and intuitive UI using Tailwind CSS.

## Built with

- **Frontend**: React, TypeScript, Tailwind CSS, React Query
- **Backend**: Node.js, TypeScript, Socket.io

## Prerequisites

- To play a multi-player game locally, ensure the backend server is running. The backend repo can be found [here](https://github.com/hyundonmoon/tictactoe-server)
- Ensure you are using Node.js version 20.6.0 or above.

## Installation

1. Clone repo

```bash
git clone https://github.com/hyundonmoon/tictactoe.git
```

2. Install dependencies

```bash
cd ./tictactoe
npm i
```

3. Run locally

```bash
npm run dev
```

4. Play

- Visit http://localhost:5173.

## Roadmap

- [ ] Use absolute paths to import modules
- [ ] Add scoring system for multi-player games
- [ ] Change app folder structure into a feature-driven structure
