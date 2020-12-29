import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyUserPageRoutingModule } from './my-user-routing.module';

import { MyUserPage } from './my-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyUserPageRoutingModule
  ],
  declarations: [MyUserPage]
})
export class MyUserPageModule {}
