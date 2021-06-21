import { Observable } from '@nativescript/core'

export class HelloWorldModel extends Observable {

  makeRequest() {
    global.http.request({
      method: 'get',
      url: '/todos/1',
      dontFollowRedirects: false,
      headers: {
      },
      timeout: 0
    }).then(response => {
      console.log(response.content)
    })
  }

}
