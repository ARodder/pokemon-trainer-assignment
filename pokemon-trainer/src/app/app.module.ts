import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TrainerComponent } from './trainer/trainer.component';
import { PokemonDisplayComponent } from './trainer/pokemon-display/pokemon-display.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokeCardComponent } from './pokedex/poke-card/poke-card.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    HeaderComponent,
    LandingPageComponent,
    TrainerComponent,
    PokemonDisplayComponent,
    PokedexComponent,
    PokeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [UserService,AuthGuard,PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
