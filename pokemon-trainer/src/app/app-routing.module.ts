import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateTeam } from './auth-guard.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { TrainerComponent } from './trainer/trainer.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'pokedex',component:PokedexComponent,canActivate:[canActivateTeam]},
  {path:'trainer',component:TrainerComponent,canActivate:[canActivateTeam]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
