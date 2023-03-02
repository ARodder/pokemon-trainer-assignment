import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './shared/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  userChange = new Subject<User>();
  private user?: User;
  private changeSubscription?: Subscription;

  constructor(private http: HttpClient) {
    this.changeSubscription = this.userChange.subscribe((newUser) => {
      if (newUser.username) {
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  public getUser() {
    return this.user;
  }

  public setUser(user: User) {
    this.user = user;
    this.userChange.next(this.user);
  }

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
      });
  }

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
          pokemon: [this.user?.pokemon, newPokemon],
        },
        httpOptions
      )
      .subscribe((response) => {
        this.user = response;
        this.userChange.next(this.user);
      });
  }

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

  public logout() {
    this.user = {};
    this.userChange.next(this.user);
  }
}
