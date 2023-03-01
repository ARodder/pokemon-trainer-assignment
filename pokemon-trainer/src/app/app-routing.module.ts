import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TrainerComponent } from './trainer/trainer.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'pokedex',component:LandingPageComponent},
  {path:'trainer',component:TrainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
