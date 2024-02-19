import Keycloak from "keycloak-js";


export const _kc = new Keycloak({
    url: "http://localhost:9090/",
    realm: "SpringBootKeycloak",
    clientId: "login-app",
   });

export const initOptions = {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
}



/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
// const initKeycloak = () => {
  // _kc.init({
  //   onLoad: 'check-sso',
  //   silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  //   pkceMethod: 'S256',
  // })
  //   .then((authenticated) => {
  //     if (!authenticated) {
  //       console.log("user is not authenticated..!");
  //     } else{
  //       console.log("user is authenticated..!");
  //       console.log(authenticated)
        
  //     }
  //   })
  //   .catch(console.error);
// };

