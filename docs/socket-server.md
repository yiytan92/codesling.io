# Codesling Realtime Socket Server Developer Documentation

If you want to run all backend services along with the clientside development server, check out the project's root documentation `README.md` [instructions](../README.md)

To begin developing on the realtime websocket server, run the following from the `socket-server` folder:

```bash
yarn
yarn start
```

Documentation Table of Contents:

* [Client Events API](#client-events) (Client Emitters)
* [Server Events API](#server-events) (Server Emitters)

# API

## Client Events:

* [client.ready](#clientready)
* [client.update](#clientupdate)
* [client.disconnect](#clientdisconnect)

#### client.ready

Emit to the server when component has loaded and is ready to receive updates

```plaintext
payload: {}
```

#### client.update

Emit to the server when user has changed the state of the code editor

```plaintext
payload: {
  text: STRING
}
```

#### client.disconnect

Emit to the server when the code editor component unmounts (user navigates away from the editor page)

```plaintext
payload: {}
```

## Server Events:

* [server.initialState](#serverinitialstate)
* [server.changed](#serverchanged)
* [server.leave](#serverleave)

#### server.initialState

Emitted initially (once) by the server after client has verified that it is ready to begin rendering code editor text updates

```plaintext
payload: {
  text: STRING
}
```

#### server.changed

Emitted by the server when the state of the code editor is altered by another client

```plaintext
payload: {
  text: STRING
}
```

#### server.leave

Emitted by the server when another client leaves the code editing session

```plaintext
payload: {}
```
