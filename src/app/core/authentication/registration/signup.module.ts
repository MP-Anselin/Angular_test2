import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import {SignupComponent} from "./signup.component";
import {AuthenticationService} from "../../../services/authentication.service";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Registration",
      urls: [{ title: "Registration", url: "/registration" }, { title: "Registration" }],
    },
    component: SignupComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AuthenticationService
  ],
  declarations: [
  ],
})
export class SignupModule {}
