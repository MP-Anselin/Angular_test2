import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import CreateUserDto from "../../../services/clients/dto/createUser.dto";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      userRole: ['', Validators.required],
      age: [24],
      image: ['assets/images/users/user1.jpg'],
      password: ['', Validators.required],
      isLog: [false],
      status: [1]
    });
  }

  onSubmit() {
    this.authService.register(this.signupForm.value);
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }
}
