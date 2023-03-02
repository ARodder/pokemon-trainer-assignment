import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

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
  constructor(private pokemonService: PokemonService){}
  
  async ngOnInit() {
    await this.pokemonService.getPokemonDetails(this.pokemon).then((response)=>{
      this.imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+response.id+'.png'
    })
  }

  public onPokemonDelete(){
    this.onDelete.emit(this.pokemonIndex);
  }
}
