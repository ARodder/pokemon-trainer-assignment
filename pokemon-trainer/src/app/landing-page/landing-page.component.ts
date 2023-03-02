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
/**
 * LandingPageComponent used 
 * to control the login of users.
 */
export class LandingPageComponent implements OnInit{

  constructor(private userService:UserService){}
  user?:User;
  currentInput:string = "";

  /**
   * Checks for a user in the localStorage and if one
   * is present, login to that user.
   */
  ngOnInit(): void {
    const localStorageUser = localStorage.getItem("user");
    if(localStorageUser){
      this.userService.login(JSON.parse(localStorageUser).username);
    }
  }

  /**
   * Sets the username based on the input-value of
   * a changing field
   * @param event event value
   */
  public setUsername(event:any){
    this.currentInput=event.target.value;
  }

  /**
   * Calls the login-method from user service on the inputted
   * username.
   */
  public loginUser(){
    this.userService.login(this.currentInput);
  }

}
