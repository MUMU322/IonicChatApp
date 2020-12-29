import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyUserPage } from './my-user.page';

const routes: Routes = [
  {
    path: '',
    component: MyUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyUserPageRoutingModule {}
