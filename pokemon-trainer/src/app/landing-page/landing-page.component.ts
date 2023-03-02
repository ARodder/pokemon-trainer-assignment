import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  constructor(private userService:UserService,private _router: Router){}
  user?:User;
  currentInput:string = "";

  ngOnInit(): void {
    const localStorageUser = localStorage.getItem("user");
    if(localStorageUser){
      this.userService.login(JSON.parse(localStorageUser).username);
    }
  }

  public setUsername(event:any){
    this.currentInput=event.target.value;
  }

  public loginUser(){
    this.userService.login(this.currentInput);
  }

}
