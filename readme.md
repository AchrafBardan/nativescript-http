# installation 
Install nativescript-http into an existing NativeScript project
```
npm i nativescript-http
```

# Usage
### Core (global)
If you are using TypeScript, then add this to your app.ts file.
##### app.ts
```
declare global {
  // eslint-disable-next-line no-unused-vars
  module NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface Global {
      http: HttpClient;
    }
  }
}
```

Add the http module globaly
##### app.ts
```
import { HttpClient } from 'nativescript-http'

global.http = new HttpClient({
  baseUrl: 'https://achrafbardan.me', // optional
  unauthenticatedCallback: (response) => { // optional
    console.log(response.content);
  },
  // When an http response code is inside this array the above function will run
  unauthenticatedStatusCodes: [201] // optional
});
```

Make a request
##### main-page-model.ts
```
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
```