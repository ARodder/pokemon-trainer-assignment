import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';
import { UserService } from '../services/user.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
/**
 * Controls PokedexComponent retrieves all-pokemon and display them on different
 * pages.
 */
export class PokedexComponent implements OnInit{
  
  constructor(private userService:UserService,private pokemonService:PokemonService){}
  pageNum: number = 0;
  pokemons: Array<Array<Pokemon>> = [];
  

  /**
   * Retrieves the first page of pokemons, 
   * and loads the user from the localStorage on refresh
   */
  async ngOnInit() {
    if(!this.userService.getUser()){
      const localStorageUser = localStorage.getItem("user");
      if(localStorageUser){
        this.userService.login(JSON.parse(localStorageUser).username);
      }
    }
  }

  /**
   * Changes the page of the pokedex forward,
   * if it is the first page it applies 
   * an animation. And divides the pokemons
   * over both displayed pages.
   * 
   * @param page element pressed
   */
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

  /**
   * Changes the page of the pokedex backward,
   * if it is the first page it applies 
   * an animation. Also divides the pokemons
   * over both displayed pages.
   * 
   * @param page element pressed
   */
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
