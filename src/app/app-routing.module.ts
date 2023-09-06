import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectingDotsComponent } from './components/backgrounds/connecting-dots/connecting-dots.component';

const routes: Routes = [
  {
    path: 'connectingdots',
    component: ConnectingDotsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
