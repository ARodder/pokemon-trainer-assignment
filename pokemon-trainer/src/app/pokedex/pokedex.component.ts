import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit{
  
  constructor(private userService:UserService){}
  pageNum: number = 0;
  pokemons: Array<Pokemon> = [
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
    {
      name: 'charmeleon',
      url: 'https://pokeapi.co/api/v2/pokemon/5/',
    },
    {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
    {
      name: 'squirtle',
      url: 'https://pokeapi.co/api/v2/pokemon/7/',
    },
    {
      name: 'wartortle',
      url: 'https://pokeapi.co/api/v2/pokemon/8/',
    },
    {
      name: 'blastoise',
      url: 'https://pokeapi.co/api/v2/pokemon/9/',
    },
    {
      name: 'caterpie',
      url: 'https://pokeapi.co/api/v2/pokemon/10/',
    },
  ];
  pages: Array<Array<Pokemon>> = [
    this.pokemons,
    this.pokemons,
  ];

  ngOnInit(): void {
    const localStorageUser = localStorage.getItem("user");
    if(localStorageUser){
      this.userService.login(JSON.parse(localStorageUser).username);
    }
  }

  
  
  

  public applyFlipForward(page: any) {
    if (this.pageNum === 0) {
      page.parentNode.classList.add('page-flip');
      page.parentNode.nextElementSibling.classList.add('page-flip');
    }

    this.pageNum++;
  }

  public applyFlipBackwards(page: any) {
    if (this.pageNum === 1) {
      page.parentNode.previousElementSibling.classList.remove('page-flip');
      page.parentNode.classList.remove('page-flip');
    }

    this.pageNum--;
  }
}
