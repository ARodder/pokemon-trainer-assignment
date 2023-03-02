import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {lastValueFrom} from "rxjs";
import { Pokemon } from "../shared/pokemon.model";

@Injectable({ providedIn: 'root' })
export class PokemonService {
   constructor(private http: HttpClient) {}

   public async getPokemonDetails(pokemonName:string){
      return await lastValueFrom(this.http.get<any>(environment.pokeApiUrl+"pokemon/"+pokemonName));
   }

   public async getPageOfPokemon(pageNum:number){
      const offset = (pageNum-1)*18;
      return await lastValueFrom(this.http.get<any>(environment.pokeApiUrl+"pokemon?limit=18&offset="+offset));
   }
}