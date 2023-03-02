import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Pokemon } from 'src/app/shared/pokemon.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css']
})
/**
 * Controls the PokeCardComponent and displays different pokemons with name
 * and picture.
 */
export class PokeCardComponent implements OnInit{
  @Input() pokemon:Pokemon = new Pokemon("","");
  constructor(private userService:UserService){}
  imgUrl: string = "";
  user?:User = this.userService.getUser();
  userSub?:Subscription;
  collected:boolean = false;

  /**
   * Initiates the user subscription used to determine if a pokemon
   * is part of a users collection, and generates the url for the pokemons
   * image.
   */
  ngOnInit(): void {
    this.userSub = this.userService.userChange.subscribe((newUser)=>{
      this.user=newUser;
      this.collected = this.user.pokemon?.includes(this.pokemon.name) ?? false;
    });

    const urlParts:Array<String> = this.pokemon.url.split("/");
    this.imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+urlParts[urlParts.length-2]+'.png';
    this.collected = this.user!.pokemon?.includes(this.pokemon.name) ?? false;
  }

  /**
   * Adds pokemon to collection by calling addPokemon from userService
   */
  public addToCollection(){
    this.userService.addPokemon(this.pokemon.name);
  }

  
}
