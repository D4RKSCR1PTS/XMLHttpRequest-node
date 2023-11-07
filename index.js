import { shitreq } from "./xmlreq.js"
    let data = await shitreq({
      url: 'https://example.com',
      data: {},
      dataType: "json",
      responseType: "json",
      withCredentials: !0,
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      }
    })
