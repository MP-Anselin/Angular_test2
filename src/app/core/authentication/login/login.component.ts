import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('testA@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Mackendy88', Validators.required),
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }

  redirectToRegistration(){
    this.router.navigate(['/registration']);
  }
}
