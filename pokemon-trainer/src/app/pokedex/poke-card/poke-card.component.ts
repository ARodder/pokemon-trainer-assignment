import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/pokemon.model';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css']
})
export class PokeCardComponent implements OnInit{
  @Input() pokemon:Pokemon = new Pokemon("","");
  imgUrl: string = "";


  ngOnInit(): void {
    const urlParts:Array<String> = this.pokemon.url.split("/");
    this.imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+urlParts[urlParts.length-2]+'.png';
  }


  
}
