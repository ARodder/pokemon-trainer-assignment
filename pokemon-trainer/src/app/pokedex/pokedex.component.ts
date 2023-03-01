import { Component } from '@angular/core';
import { Pokemon } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent {
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
    this.pokemons,
    this.pokemons,
  ];

  public applyFlipForward(page: any) {
    const siblingNodes = page.parentNode.parentNode.children;
    const currentNode = siblingNodes.namedItem(this.pageNum);
    const foundSibling = siblingNodes.namedItem(this.pageNum+1);
    console.log(parseInt(currentNode.id)+1);
    console.log(foundSibling);

    currentNode.classList.add('page-flip');
    foundSibling.classList.add('page-flip');
    

    

    console.log(
      page.parentNode.nextElementSibling.classList.contains('white-page')
    );
    console.log(page.parentNode.parentNode.children);


    this.pageNum++;
  }

  public applyFlipBackwards(page: any) {
    page.parentNode.previousElementSibling.classList.remove('page-flip');
    page.parentNode.classList.remove('page-flip');

    this.pageNum--;
  }
}
