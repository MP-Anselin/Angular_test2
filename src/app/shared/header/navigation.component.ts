import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [UserService]
})
export class NavigationComponent {
  protected firstName: string = '';
  protected lastName: string = '';

  constructor(
    private authService: AuthenticationService,
  ) {
    if (this.authService.currentUserValue) {
      const result = this.authService.currentUserValue;
      this.firstName = result.firstName;
      this.lastName = result.lastName;
    }
  }

  ngOnInit() {

  }

  logout(): void {
    this.firstName = "";
    this.lastName = "";
    this.authService.logout();
  }

}
