import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/shared/pokemon.model';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.css']
})
export class PokemonDisplayComponent implements OnInit{
  @Input() pokemon: string ="";
  @Input() pokemonIndex: number = 0;
  @Output("pokemonDelete") onDelete: EventEmitter<number> = new EventEmitter();
  imgUrl: string = "";
  
  ngOnInit(): void {
    // const urlParts:Array<String> = this.pokemon.url.split("/");
    // this.imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+urlParts[urlParts.length-2]+'.png';
  }

  public onPokemonDelete(){
    this.onDelete.emit(this.pokemonIndex);
  }
}
