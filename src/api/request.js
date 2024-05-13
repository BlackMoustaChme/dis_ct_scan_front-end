import {Response} from "./response.js";

const protocol = "http";
const host = "127.0.0.1";
const port = "5000";
const name = "";
const domain = `${protocol}://${host}:${port}`;

async function _sendRequest(type, uri, options, data) {//options для передачи header'ов
    let request;
    let headers = {
        // "Content-type": "text/plain; charset=utf-8",
        // "Authorization": localStorage.getItem("token")
    }

    if (options != undefined || options != null) {//проверка options обращать внимание на передаваемое null или не null
        let keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++) {
            headers[keys[i]] = options[keys[i]];
        }
    }

    if (data === null || data === undefined) {
        console.log(headers, "DATA UNDEFINED");
        request = fetch(uri, {method: type, headers: headers});
    } else if (type === "delete" || type === "get") {
        console.log("TYPE DELETE OR GET")
        headers["Data"] = JSON.stringify(data);//для данных в header'ах
        request = fetch(uri, {method: type, headers: headers});
    } else {
        request = fetch(uri, {method: type, headers: headers, body: JSON.stringify(data)});
    }
    //прокидка реквеста и вытаскивание данных
    let response = await request;
    let body
    let json
    let blob

    try {
        json = await response.clone()
        console.log(json)
        blob = await response.clone()
        console.log(blob)
    } catch (e) {
        console.log(e)
        json = null
        blob = null
    }

    try {
        json = await json.json()
    } catch (e) {
        console.log(e)
        json = null
    }

    try {
        blob = await blob.blob()
    } catch (e) {
        console.log(e)
        blob = null
    }

    if (json === null) {
        body = blob
    } else {
        body = json
    }

    return new Response(response.status, body); //Response это ДТО объект
}

export async function asyncPostFile(data) {
    let request;
    
    console.log("File", data)
    const formData = new FormData(data);
    // formData.append("file", data);
    console.log("formData", formData)
    // const headers = new Headers(config.headers)

    request = fetch(`${domain}/study`, {method: "post", body: formData})

    let response = await request;
    let json;
    try {
        json = await response.json();
    } catch (error) {
        json = null;
    }
    console.log("Response", await response)
    console.log("postStatus", response.status)
    console.log("JSON", json)
    return new Response(response.status, json)
} 

export async function asyncGetStatus(studyId) {
    return await _sendRequest("get", `${domain}/study/${studyId}/status`)
}

export async function asyncGetResult(studyId) {
    return await _sendRequest("get", `${domain}/study/${studyId}`)
}
