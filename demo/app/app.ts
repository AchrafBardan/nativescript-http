/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from '@nativescript/core'
import { HttpClient } from 'nativescript-http'


global.http = new HttpClient({
  baseUrl: 'https://achrafbardan.me',
  unauthenticatedCallback: (response) => {
    console.log(response.content);
  },
  // When an http response code is inside this array the above function will run
  unauthenticatedStatusCodes: [201]
});


Application.run({ moduleName: 'app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
