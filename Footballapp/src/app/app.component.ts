import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {MainscreenPage} from "../pages/mainscreen/mainscreen";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public  username : string;
  public emailaddress : string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Account Info', component: MainscreenPage },
      { title: 'Logout', component: HomePage }
    ];
      events.subscribe('user:info', user => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.username = user[0]['name'];
        this.emailaddress = user[0]['email'];

      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
