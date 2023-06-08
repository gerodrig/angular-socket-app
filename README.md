
# Angular Socket App

This repository contains a monorepo for an Angular application, powered by WebSockets. The monorepo is set up using TurboPack, a high performance build system.

## Getting Started

These instructions will guide you on how to run the applications within the monorepo on your local machine.

## Prerequisites

Node.js and npm installed on your machine. You can download Node.js and npm from the official Node.js website.

## Clone the Repository

Start by cloning the repository to your local machine.

```
git clone https://github.com/gerodrig/angular-socket-app.git
cd angular-socket-app
```

## Install Dependencies

TurboPack has been set as a devDependency for this project. To install TurboPack and other dependencies, run the following command:

```dotnetcli
npm install
```
## Running the applications

This monorepo is configured with TurboPack to manage the build and run processes. It contains multiple apps within the apps/ directory, and the scripts are defined in the package.json file to build and run the applications.

Development mode
To start the application in development mode, run:

```dotnetcli
npm run dev
```

This will run the turbo dev script as defined in the package.json file.

## Build
To build the application, run:

```dotnetcli
npm run build
```

This will run the turbo build script, and compile your code for production.

## Start the Application
To start the application, run:

```dotnetcli
npm start
```

This will start the main.js file located in the dist folder of the 01-server-sockets app.

# Authors 

Gerardo Rodriguez - garc@outlook.com

# License 

This project is licensed under the MIT License.