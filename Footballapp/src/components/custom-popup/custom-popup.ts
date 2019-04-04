import { Component,Renderer  } from '@angular/core';
import {ViewController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the CustomPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-popup',
  templateUrl: 'custom-popup.html'
})
export class CustomPopupComponent {

  text: string;
  public record : {}
  public baseURI               : string  = "http://serverlink/";
  public ishide                 : boolean = false;
  public Whowin : string = "";
  public counter : number = 0;
  public win : number = 0;
  public imglink : string = "http://serverlink/img/teams/";
  public ourword : string = "";

  public winnername : string = "";

  public menuTitle :string = "";

  public PredorGoals : boolean;

  public goalsdilog : Array<any> = [];

  //<div *ngIf="item['team_name'] == record['team_season_home_name']" class="event-text team-home clearfix">
  //<div *ngIf="item['team_name'] == record['team_season_home_name']" class="event-text team-home wrapper">

  //<div *ngIf="item['team_name'] == record['team_season_home_name']" class="event-text team-home clearfix">
  //             <div class="event-text team-home wrapper">
  //               <div class="text-wrapper">
  //                 <div class="event-time"> {{ item['elapsed'] }}' </div>
  //                 <div class="event-text-main"> {{ item['team_name'] }} </div>
  //                 <div *ngIf="item['goal_subtype']" class="event-text-additional"> {{ item['goal_subtype'] }} </div>
  //               </div>
  //             </div>
  //           <div class="event-icon"><div class="match-event-icon type-goal"></div></div>
  //</div>


  constructor(public renderer: Renderer, public viewCtrl: ViewController , public params: NavParams,public http  : HttpClient,
  public toastCtrl  : ToastController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
    this.record = this.params.get('param');
    if(!this.record['id_league']) {
      this.menuTitle = "Prediction is :";
      this.PredorGoals = true;
      this.load();
    }
    else {
      this.menuTitle = "Match reports :";
      this.PredorGoals = false;
      this.loadforgoals();
    }
  }

  load() : void
  {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "GetMatchPredict", "homeid" : this.record['id_team_home'], "awayid" : this.record['id_team_away'] },
      url       : any      	= this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          //A = data['Draw']   B- data['Home_win']   C-data['Away_win']
          //console.log(data);
          if ( data['Away_win'] > data['Home_win'] && data['Away_win'] > data['Draw'])
          {
            this.Whowin = "Away_win";
          }
          else
          {
            if(data['Home_win'] > data['Draw'] && data['Home_win'] > data['Away_win'])
            {
              this.Whowin = "Home_win";
            }
            else
              if (data['Draw'] > 0)
                this.Whowin = "Draw";
          }
          //console.log(this.Whowin);
          if (this.Whowin == "") {
            if (data['Draw'] == data['Home_win']) {
              this.counter = 2;
              if (data['Draw'] == data['Away_win'])
                this.counter = 3;
              if (this.counter == 2) {
                this.win = Math.floor(Math.random() * this.counter);
                if (this.win == 0)
                  this.Whowin = "Draw";
                else if (this.win == 1)
                  this.Whowin = "Home_win";
              }
            }
            else if(data['Home_win'] == data['Away_win']) {
              this.counter = 2;
              if (data['Home_win'] == data['Draw'])
                this.counter = 3;
              if (this.counter == 2) {
                this.win = Math.floor(Math.random() * this.counter) + 1;
                if (this.win == 1)
                  this.Whowin = "Home_win";
                else if (this.win == 2)
                  this.Whowin = "Away_win";
              }
            }
          }
          //console.log(this.Whowin);
          if(this.counter == 3) {
            this.win = Math.floor(Math.random() * this.counter);
            if (this.win == 0)
              this.Whowin = "Draw";
            else if (this.win == 1)
              this.Whowin = "Home_win";
            else if (this.win == 2)
              this.Whowin = "Away_win";
          }
          //console.log(this.Whowin);
          if(this.Whowin == "Draw") {
            if(data['Draw'] == 1)
              data['Draw'] = 0.6;
            this.imglink = this.imglink + 'Draw.png';
            this.ourword = 'Match will end in a draw with p = ' + data['Draw'];
          }
          else if(this.Whowin == "Home_win") {
            this.imglink = this.imglink + this.record['home_team'].split(' ').join('') + '.png';
            if(data['Home_win'] == 1)
              data['Home_win'] = 0.8;
            this.winnername = this.record['home_team'];
            this.ourword =  'Will win the match with p = ' + data['Home_win'];
          }
          else {
            this.imglink = this.imglink + this.record['away_team'].split(' ').join('') + '.png';
            if(data['Away_win'] == 1)
              data['Away_win'] = 0.8
            this.winnername = this.record['away_team'];
            this.ourword =  'Will win the match with p = ' + data['Away_win'];
          }
          this.ishide = true;

          this.Whowin = "";
          this.counter = 0;
          this.win = 0;


        },
        (error : any) =>
        {
          this.sendNotification('Cannot loading the files please try again later!');
        });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  sendNotification(message : string)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }

  loadforgoals () :void
  {

    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= { "key" : "GetMatchGoals", "fix_id" : this.record['_id'] },
      url       : any      	= this.baseURI + "manage-data.php";
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
        {
          this.goalsdilog = data;
          //console.log(data);
        },
        (error : any) =>
        {
          this.sendNotification('Cannot Get the matches data! please try again');
        });

  }

}
