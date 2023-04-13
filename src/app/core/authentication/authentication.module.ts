import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationRoutes} from "./authentication.routing";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./registration/signup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
})
export class AuthenticationModule {}
