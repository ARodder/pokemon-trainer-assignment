

/**
 * Model for the pokemon recieved from the poki-api.
 */
export class Pokemon{
   name: string;
   url: string;

   constructor(name:string,url:string){
      this.name = name;
      this.url = url;
   }
}