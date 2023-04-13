import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {IUserCard} from "../../services/clients/interfaces/user.interface";


@Component({
  templateUrl: 'profile.component.html',
  providers: [UserService]
})
export class ProfileComponent {
  userData: IUserCard;
  dontDisturb: boolean;


  constructor(
    private authService: AuthenticationService,
    private userService: UserService
    ) {
    this.userData = this.authService.currentUserValue;
    if (this.userData.status == 2)
      this.dontDisturb = true;
    else
      this.dontDisturb = false;
  }

  setStatusState(dontDisturb: boolean) {
    if (dontDisturb && this.userData.status == 1) {
      this.userData.status = 2;
      this.userService.updateUser(this.userData);
    } else if (!dontDisturb && this.userData.status == 2) {
      this.userData.status = 1;
      this.userService.updateUser(this.userData);
    }
    localStorage.setItem(this.authService.userOnline, JSON.stringify(this.userData));
  }
}
