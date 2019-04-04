import { Component } from '@angular/core';
import {NavController, ToastController, MenuController, Events} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isLoggedIn:boolean = false;
  users: any;

  public formlogin                   : FormGroup;

  public username              : any;
  public password              : any;
  public islogin               : boolean = false;
  public isreg                 : boolean = false;

  public pageTitle              : string;

  private baseURI               : string  = "http://serverlink/";

  public userdata : Array<any> = [];

  constructor(public navCtrl: NavController,
              public fb         : FormBuilder,
              public http       : HttpClient,
              public toastCtrl  : ToastController,
              public menu: MenuController,
              public events: Events)
  {
    this.menu.swipeEnable(false);
    this.formlogin = fb.group({
      "user"                  : ["", Validators.compose([Validators.required, Validators.maxLength(16), Validators.pattern('^[_a-zA-Z0-9]+$')])],
      "pass"           : ["", Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }
  /*ionViewDidLoad() {

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))

    })*/

  login(){
    this.isreg = false;
    this.islogin = true;

  }
  signup(){
    //this.navCtrl.push(Signup, {}, {animate:false});
    this.isreg = true;
    this.islogin = false;
  }
  backtomain(){
    this.islogin = false;
    this.isreg = false;
    this.username = "";
    this.password = "";
  }

  Loginclick(){
    this.username = this.username.toString().toLowerCase();
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "checkuserpassvalid", "user" : this.username, "pass" : this.password },
      url       : any      	= this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          //console.log(data[0]['result']);
          /*console.dir(data);
          console.log(data[0]['result'])

          console.log(this.userdata[0]['result']);
          //console.log('result: ' + data.result);*/
          if (data[0]['result'] == 'true') {
            this.sendNotification(`Welcome ${this.username}`);
            this.userdata = data[1];
            this.events.publish('user:info', this.userdata);
            //this.navCtrl.setRoot('MainscreenPage', {userde : this.userdata})
            this.navCtrl.setRoot('MainscreenPage');
          }
          else
            this.sendNotification('Your username or password was incorrect!');
          // If the request was successful notify the user
        },
        (error : any) =>
        {
          this.sendNotification('Cannot loading the files please try again later!');
        });
  }

  onForgotPassword(){

  }

  sendNotification(message : string)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }

}
