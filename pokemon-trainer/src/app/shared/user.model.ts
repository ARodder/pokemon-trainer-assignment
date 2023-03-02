
/**
 * User used to represent the structure for the user from the translation-api
 */
export class User{
   id?:number;
   username?: string;
   pokemon?: Array<string>;

   constructor(username:string,pokemon: Array<string>,id:number){
      this.username = username;
      this.pokemon = pokemon;
      this.id=id;
   }
}