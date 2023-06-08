# Server Sockets

This project is a server-side implementation built with NestJS and utilizes websockets for real-time communication. This repository is managed as a monorepo with TurboPack for efficient dependency management and task execution.

## Monorepo Setup with TurboPack

TurboPack is an excellent tool for managing monorepos by using efficient dependency graph evaluation to only perform necessary operations on the packages that need them. This greatly speeds up common tasks such as build, lint, and test, and is particularly well suited to large or complex monorepos.

In this project, TurboPack has been used to set up the project in such a way that it is able to manage the dependencies and scripts for each individual package without duplicating any unnecessary work.

## How to Run the Apps

Make sure you have Node.js and NPM installed in your system.

Clone this repository:

```dotnetcli
git clone https://github.com/your-repository/server-sockets.git
```

Install the dependencies:

```dotnetcli
npm install
```

You can now run the application in a few different ways:

## Development

To start the server in development mode, use the following command:

```dotnetcli
npm run dev
```

This command will start the server in watch mode, which means it will automatically restart whenever you make changes to the source code.

## Production

To start the server in production mode, use the following command:

```dotnetcli
npm run start:prod
```