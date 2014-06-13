# primus-example

Simple example of Primus usage.

## Run

```
npm install
npm start
```

## Usage

### Run server

When the server is started, it exposes an UI on the port 3000 by default, you can specify a different port with the environement variable PORT.

```sh
PORT=8080 npm start
```

### Broadcast an hello message

You can tell to the server to broadcast an hello message by sending to it a SIGUSR2 signal.

```sh
kill -s SIGUSR2 {pid}
```

## License

MIT