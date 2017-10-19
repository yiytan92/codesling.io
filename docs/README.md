# Developer Documentation

This application is composed of sub applications, all self contained within their own folders; They all have their own independent `package.json` dependency management.

This allows for smoother deployment of the sub applications as servers/services across virtual machines and clusters without needing to copy the entire source code, especially when needing to scale an individual application (e.g. needing to scale the realtime socket server only due to increased demand in concurrent connections)

Eventually, this may be refactored such that every sub application is its own github repository with its own version and tracking.

# System Architecture

The system architecture of Codesling consists of these main sub applications:

![codesling architecture v1](assets/codesling_architecture_v1.png)

## client

The front-end codebase is written in [ReactJS](https://reactjs.org/) and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app#getting-started)

## rest-server

The RESTful JSON Data API is written in Javascript using NodeJS and [expressJS](https://expressjs.com/).

## socket-server

The realtime socket server is written in Javascript using NodeJS and [socket.io](https://socket.io/).

## coderunner-service

The service that runs individual code submissions is written in Javascript using NodeJS and some native NodeJS libraries.

# File Architecture

The file architecture of Codesling is broken up into sub applications. The specific architecture within the sub applications can be found in the individual `README.md` files for each sub application.

## File Naming

### Suffixes

**Directories:**

- `-server`: All client-facing back-end APIs
- `-server`: All non-client-facing back-end APIs

**Files:**

- `*.test.js`: All test files to be recognized by Jest
