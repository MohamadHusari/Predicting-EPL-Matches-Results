import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, ToastController , ModalController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CustomPopupComponent} from "../../components/custom-popup/custom-popup";

/**
 * Generated class for the MainscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainscreen',
  templateUrl: 'mainscreen.html',
})
export class MainscreenPage {

  public items : Array<any> = [];
  public matches: string;
  public baseURI               : string  = "http://arabtnt.site.megatam.com/";
  public roundsarr : Array<any> = [];
  public yearsarr : Array<any> = [];
  public itsfirst : boolean = false;
  public years: number;
  public rounds: number;
  public records : Array<any> = [];
  public firsttime : boolean = true;
  public saveyear : number;
  public saveround : number;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http       : HttpClient,
              public toastCtrl  : ToastController,
              public modalCtrl : ModalController,
              public menu: MenuController) {
    this.menu.swipeEnable(true);
    //this.userdetails = navParams.get('userde');
  }

  ionViewWillEnter() {
    //console.log(this.userdetails);
    this.load();
    this.matches = "fixtures";
    this.loadSeasons();
    let i = 1;
    while (i != 38 )
    {
      this.roundsarr.push(i);
      i++;
    }
    this.rounds = 37;
    this.years = 2;
    this.saveround = 37;
    this.saveyear = 2;
  }

  load() : void
  {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "SoonFixtures" },
      url       : any      	= this.baseURI + "manage-data.php";
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          this.items = data;
        },
        (error : any) =>
        {
          this.sendNotification('Cannot Get the matches data! please try again');
        });
  }


  sendNotification(message : string)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }

  openModal(param : any) : void
  {
    let modal = this.modalCtrl.create(CustomPopupComponent,{param},{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

  loadSeasons () : void {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "GetSeasons" },
      url       : any      	= this.baseURI + "manage-data.php";
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          this.yearsarr = data;
        },
        (error : any) =>
        {
          this.sendNotification('Cannot Get the matches data! please try again');
        });
  }
  changedSelection( ) : void
  {
    if(this.matches == 'scores')
    {
      if(this.firsttime == true)
      {
        this.firsttime = false;
        if(this.years == 2) {
          this.itsfirst = false;
        }
        this.loadMatchesround();
      }

    }
  }

  loadMatchesround () : void {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "GetMatches", "yearid" : this.years, "roundnum" : this.rounds },
      url       : any      	= this.baseURI + "manage-data.php";
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          this.records = data;
          //console.log(data);
        },
        (error : any) =>
        {
          this.sendNotification('Cannot Get the matches data! please try again');
        });
  }

  changedselcrounds () : void {
    if(this.rounds != this.saveround) {
      this.loadMatchesround();
      this.saveround = this.rounds;
    }
  }

  changedselcyears () : void {
    if(this.years != this.saveyear){
      if(this.years == 2) {
        this.itsfirst = false;
        this.rounds = 37;
      }
      else if(this.years != 2) {
        this.itsfirst = true;
        this.rounds = 38;
      }
      this.loadMatchesround();
      this.saveyear = this.years;
    }
  }


}
