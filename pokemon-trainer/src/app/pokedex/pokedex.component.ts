import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';
import { UserService } from '../services/user.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit{
  
  constructor(private userService:UserService,private pokemonService:PokemonService){}
  pageNum: number = 0;
  pokemons: Array<Array<Pokemon>> = [];
  

  async ngOnInit() {
    if(!this.userService.getUser()){
      const localStorageUser = localStorage.getItem("user");
      if(localStorageUser){
        this.userService.login(JSON.parse(localStorageUser).username);
      }
    }
  }

  
  
  

  public async applyFlipForward(page: any) {
    if((this.pageNum*18)-1279<18){
      this.pageNum++;
    }
    if (this.pageNum === 1) {
      page.parentNode.classList.add('page-flip');
      page.parentNode.nextElementSibling.classList.add('page-flip');
    }

    await this.pokemonService.getPageOfPokemon(this.pageNum).then((response)=>{
      this.pokemons = [response.results.slice(0,9),response.results.slice(9)];
    });
  }

  public async applyFlipBackwards(page: any) {
    this.pageNum--;
    if (this.pageNum === 0) {
      page.parentNode.previousElementSibling.classList.remove('page-flip');
      page.parentNode.classList.remove('page-flip');
    }else{
      await this.pokemonService.getPageOfPokemon(this.pageNum).then((response)=>{
        this.pokemons = [response.results.slice(0,9),response.results.slice(9)];
      });
    }


  }
}
