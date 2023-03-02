import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {lastValueFrom} from "rxjs";
import { Pokemon } from "../shared/pokemon.model";

@Injectable({ providedIn: 'root' })
/**
 * Service to interact with the poke-api.
 */
export class PokemonService {
   constructor(private http: HttpClient) {}

   /**
    * Retrieves the details of a specific pokemon based on its name.
    * @param pokemonName name of the pokemon to get details from
    * @returns promise containing the found pokemon.
    */
   public async getPokemonDetails(pokemonName:string){
      return await lastValueFrom(this.http.get<any>(environment.pokeApiUrl+"pokemon/"+pokemonName));
   }

   /**
    * Retrieves a list of pokemons with the length of 18,
    * and an offset based on the current pageNumber.
    * @param pageNum current pageNumber
    * @returns promise containing the next page
    */
   public async getPageOfPokemon(pageNum:number){
      const offset = (pageNum-1)*18;
      return await lastValueFrom(this.http.get<any>(environment.pokeApiUrl+"pokemon?limit=18&offset="+offset));
   }
}