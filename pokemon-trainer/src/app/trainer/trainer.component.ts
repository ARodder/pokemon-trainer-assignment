import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit{
  constructor(private userService:UserService){}
  userSub?:Subscription;
  user?:User = this.userService.getUser();
  
  ngOnInit(): void {
    this.userSub = this.userService.userChange.subscribe((newUser)=> this.user= newUser);
    
    if(!this.userService.getUser()){
      const localStorageUser = localStorage.getItem("user");
      if(localStorageUser){
        this.userService.login(JSON.parse(localStorageUser).username);
      }
    }

  }

  
  public deletePokemon(pokemonIndex:any){
    this.userService.removePokemon(pokemonIndex);
  }
}
