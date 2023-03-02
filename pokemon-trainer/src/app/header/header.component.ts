import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/**
 * Component used for determining if the
 * navItems should be displayed, and control
 * logout.
 */
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private _router: Router) {}
  userSub?: Subscription;
  user?: User;
  showNav: boolean = false;

  /**
   * Initiate userChange subscription, and change the displaying
   * of the nav-items depending on the state of the user.
   */
  ngOnInit(): void {
    this.userSub = this.userService.userChange.subscribe((newUser) => {
      this.user = newUser;
      if (newUser.username) {
        this.showNav = true;
      } else {
        this.showNav = false;
      }
    });
  }
  /**
   * Unsubscribe when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  /**
   * Call the logout method from userService to clear localstorage-user
   * and navigate to landing-page.
   */
  public logout() {
    this.userService.logout();
    this._router.navigateByUrl('/');
  }
}
