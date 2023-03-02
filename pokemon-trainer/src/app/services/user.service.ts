import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
/**
 * Service to control all interaction between trainer-api
 * and front-end application.
 */
export class UserService {
  userChange = new Subject<User>();
  private user?: User;
  private changeSubscription?: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.changeSubscription = this.userChange.subscribe((newUser) => {
      if (newUser.username) {
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  /**
   * Get the current state of the user
   * @returns state of the user
   */
  public getUser() {
    return this.user;
  }

  /**
   * Sets the state of the user.
   * @param user new state of the user
   */
  public setUser(user: User) {
    this.user = user;
    this.userChange.next(this.user);
  }

  /**
   * Creates a new user in the trainer-api.
   * @param username name of the new user to create
   */
  public createNewUser(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-API-Key': environment.apiKey,
      }),
    };
    this.http
      .post<User>(
        environment.apiUrl + '/trainers',
        { username: username, pokemon: [] },
        httpOptions
      )
      .subscribe((response) => {
        this.user = response;
        console.log(this.user);
        if (this.user) {
          this.userChange.next(this.user);
        }
      });
  }

  /**
   * Logs in to the trainer-api if there is an existing user with the given username
   * else it creates a new user. 
   * 
   * @param username username to login
   */
  public login(username: string) {
    this.http
      .get<Array<User>>(environment.apiUrl + '/trainers?username=' + username)
      .subscribe((response) => {
        if (response[0]) {
          this.user = response[0];
          this.userChange.next(this.user);
          console.log(this.user);
        } else {
          this.createNewUser(username);
        }
        this.router.navigateByUrl('/pokedex');
      });
  }
  /**
   * Adds a new pokemon to the user and updates the 
   * trainer-api.
   * 
   * @param newPokemon new pokemon to add
   */
  public addPokemon(newPokemon: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-API-Key': environment.apiKey,
      }),
    };
    this.http
      .patch(
        environment.apiUrl + '/trainers/' + this.user?.id,
        {
          id: this.user?.id,
          username: this.user?.username,
          pokemon: this.user?.pokemon?.concat(newPokemon),
        },
        httpOptions
      )
      .subscribe((response) => {
        this.user = response;
        this.userChange.next(this.user);
      });
  }

   /**
   * Removes a pokemon to the user and updates the 
   * trainer-api.
   * 
   * @param pokemonIndex index of the pokemon to remove
   */
  public removePokemon(pokemonIndex: number) {
    this.user?.pokemon?.splice(pokemonIndex, 1);
    const httpOptions = {
      headers: new HttpHeaders({
        'X-API-Key': environment.apiKey,
      }),
    };
    this.http
      .patch(
        environment.apiUrl + '/trainers/' + this.user?.id,
        {
          id: this.user?.id,
          username: this.user?.username,
          pokemon: this.user?.pokemon,
        },
        httpOptions
      )
      .subscribe((response) => {
        this.user = response;
        this.userChange.next(this.user);
      });
  }

  /**
   * Logs a user out by clearing the localStorage.
   */
  public logout() {
    this.user = {};
    this.userChange.next(this.user);
  }
}
