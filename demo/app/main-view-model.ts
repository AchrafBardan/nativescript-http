import { Observable } from '@nativescript/core'

export class HelloWorldModel extends Observable {

  makeRequest() {
    global.http.request({
      method: 'get',
      url: '/users',
      content: JSON.stringify({
        id: 1
      }),
      dontFollowRedirects: false,
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 0
    }).then(response => {
      console.log(response.content)
    })
  }

}
