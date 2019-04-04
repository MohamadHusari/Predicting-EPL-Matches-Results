import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainscreenPage } from './mainscreen';

@NgModule({
  declarations: [
    MainscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(MainscreenPage),
  ],
})
export class MainscreenPageModule {}
