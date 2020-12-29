import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { UsersPage } from './users.page';
import {UserListItemComponent} from '../user-list-item/user-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
  ],
  exports: [
    UserListItemComponent
  ],
  declarations: [UsersPage, UserListItemComponent]
})
export class UsersPageModule {}
