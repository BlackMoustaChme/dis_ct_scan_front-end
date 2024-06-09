const protocol = "http";
const host = "127.0.0.1";
const host2 = "192.168.1.59";
const port = "5000";
const port2 = "8000";
const name = "";
const domain = `${protocol}://${host2}:${port2}`;
const domain2 = `${protocol}://${host}:${port}/${name}`

export const serverSentEvents = {

    // createAndOpenConnection() {
        // const evtSource = new EventSource(`${domain2}`)
        // return evtSource
    // },

    studyStatusSource(id) {
        // console.log("status step 3")
        let studyStatusSource = new EventSource(`${domain}/study/status/${id}`)
        return studyStatusSource
    },

    SSEReceive(evtSrc, callback) {
        console.log("sse")
        evtSrc.addEventListener('status', (event) => {
            // console.log("SSE =>", event.data)
            callback(event.data)
        })
    }, 

    SSEClose(evtSrc) {
        // console.log("status step 9")
        evtSrc.close()
    },


}

