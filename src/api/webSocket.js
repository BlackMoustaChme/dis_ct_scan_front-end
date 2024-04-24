const protocol = "ws";
const host = "127.0.0.1";
const port = "5000";
const name = "";
const domain2 = `${protocol}://${host}:${port}/${name}`;

function createAndConnectToNotificationWebSocket() {
    console.log("create ws")
    let ws = new WebSocket(`${domain2}/`);
    return ws;
}
const wssend = (ws, message) => {
    ws.send(message)
}
const wsclose = (ws) => {
    console.log("close ws")
    ws.close(1000, "Complete")
}
const wsonopen = (ws, wsID, message) => {
        ws.onopen = (event) => {
            console.log("op" + wsID + " ws:"+ ws)
            console.log('WS counter was opened: ' + event);
            ws.send(wsID);
    }
}

const receive = (ws, callback) => {
    ws.onmessage = (event) => {
        console.log('ws counter got message: ' + event.data);
        callback(event.data)
    }
}

export {createAndConnectToNotificationWebSocket, wssend, receive, wsonopen, wsclose}