import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import { Storage } from '@ionic/storage';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json  loading: Loading;
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api, private storage: Storage) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      // if (res == 'success') {
      // if (res.status == 200) {
        const jwtToken = this.cleanToken(res.headers.get('Authorization'));
        this.storage.set('jwtToken', jwtToken);

        //this._loggedIn(res);
      // } else {
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  cleanToken(authorizationToken: string) {
    return authorizationToken.substring(7, authorizationToken.length);
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.storage.remove('jwtToken');
    this.storage.remove('currentUser');
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.storage.set('currentUser', resp);
    this._user = resp;
  }

  isAuthenticated() {
    return this.storage.get('jwtToken')
      .then(val => {
        if(val === undefined || val === null) return false;
        else return true;
      });
  }

  getAuthenticatedUser() {
    return this.api.get('auth/authenticated');
  }

  getCurrentUser() {
    return this.storage.get('currentUser');
  }

  async getJwtToken() {
    return await this.storage.get('jwtToken');
  }
}
