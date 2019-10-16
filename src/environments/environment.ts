// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hackernews_db: {
    databaseURL: 'http://hacker-news.firebaseio.com'
  },
  app_db: {
    apiKey: 'AIzaSyCkRVGFC_Seqky9FlX437WyErJMIVVz_N8',
    authDomain: 'myapp-hn-82de7.firebaseapp.com',
    databaseURL: 'https://myapp-hn-82de7.firebaseio.com',
    projectId: 'myapp-hn-82de7',
    storageBucket: 'myapp-hn-82de7.appspot.com',
    messagingSenderId: '941904173108',
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
