import { Routes } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { SignupComponent} from "./registration/signup.component";

export const AuthenticationRoutes: Routes = [
	{
		path: '',
		children: [
      {
        path: 'login',
        component: LoginComponent
      },
			{
				path: 'registration',
				component: SignupComponent
			},
		]
	}
];
