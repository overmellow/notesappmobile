import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  jwtToken: any;
  currentUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public app: App) {
    this.jwtToken = this.user.getJwtToken();
    this.currentUser = this.user._user;
  }

  logout() {
    this.user.logout();
    this.app.getRootNav().setRoot('WelcomePage');
  }

  doRefresh(refresher) {
    this.jwtToken = this.user.getJwtToken();
    refresher.complete();
  }

  // doRefresh(refresher) {

  //   this.user.getAuthenticatedUser()
  //     .subscribe(user => {
  //       this.currentUser = user.body;
  //       refresher.complete();
  //     });
  //
}
