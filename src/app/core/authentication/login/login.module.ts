import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import {LoginComponent} from "./login.component";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Login",
      urls: [{ title: "Login", url: "/login" }, { title: "Login" }],
    },
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AuthenticationService,
  ],
  declarations: [
  ],
})
export class LoginModule {}
