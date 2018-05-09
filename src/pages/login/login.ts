import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  account: { username: string, password: string } = {
    username: 'mori',
    password: '2000'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController
  ) {
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      })
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      this.user.getAuthenticatedUser()
        .subscribe(data => {
          this.user._loggedIn(data['body']);
          resolve(true)
        },
        (err) => {
          reject(err)
        }
      );
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage).then(() =>{
        loading.dismiss();
      });
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
