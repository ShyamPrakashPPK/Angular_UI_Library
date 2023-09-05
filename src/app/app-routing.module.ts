import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiAnimationComponent } from './ai-animation/ai-animation.component';

const routes: Routes = [
  {
    path: 'home',
    component: AiAnimationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
