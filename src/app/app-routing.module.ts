import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { BacariListComponent } from './feature/components/bacari/components/bacari-list.component';
import { BacaroEditComponent } from './feature/components/bacari/components/bacaro-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'bacari_list', component: BacariListComponent },
  { path: 'bacari_edit/:id', component: BacaroEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
