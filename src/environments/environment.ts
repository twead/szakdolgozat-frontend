// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  authURL: "http://localhost:8080/auth/",
  patientURL: "http://localhost:8080/api/profile/",
  dashboardURL: "http://localhost:8080/api/dashboard/",
  appointmentURL: "http://localhost:8080/api/appointment/",
  practitionerDashboardURL: "http://localhost:8080/api/practitioner-dashboard/"
  // ng build --prod
  //  authURL: "https://onlinehealthcaresystem.herokuapp.com/auth/",
  //  patientURL: "https://onlinehealthcaresystem.herokuapp.com/api/profile/",
  //  dashboardURL : "https://onlinehealthcaresystem.herokuapp.com/api/dashboard/",
  //  appointmentURL: "https://onlinehealthcaresystem.herokuapp.com/api/appointment/",
  //  practitionerDashboardURL: "https://onlinehealthcaresystem.herokuapp.com/api/practitioner-dashboard/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
