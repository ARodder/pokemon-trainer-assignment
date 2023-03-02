import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
/**
 * Controls the TrainerComponent which displays
 * a users collection of pokemon.
 */
export class TrainerComponent implements OnInit{
  constructor(private userService:UserService){}
  userSub?:Subscription;
  user?:User = this.userService.getUser();
  
  /**
   * Initiates the user change subscription
   * and loads user from localStorage on refresh.
   */
  ngOnInit(): void {
    this.userSub = this.userService.userChange.subscribe((newUser)=> this.user= newUser);
    
    if(!this.userService.getUser()){
      const localStorageUser = localStorage.getItem("user");
      if(localStorageUser){
        this.userService.login(JSON.parse(localStorageUser).username);
      }
    }

  }

  /**
   * Deletes a pokemon from the user based on a given index
   * 
   * @param pokemonIndex index of pokemon to delete
   */
  public deletePokemon(pokemonIndex:any){
    this.userService.removePokemon(pokemonIndex);
  }
}
