import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import CreateUserDto from "./dto/createUser.dto";
import LogInDto from "./dto/logIn.dto";
import {IUserCard} from "./interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  private readonly path: string;

  constructor(private http: HttpClient) {
    this.path = "/user/auth"
  }

  public login(userData: LogInDto) {
    return this.http.post<IUserCard>(
      environment.apiUrl + this.path + '/login',
      userData,
    )
  }

  public register(userData: CreateUserDto) {
    return this.http.post<IUserCard>(
      environment.apiUrl + this.path + '/signup',
      userData,
    );
  }

  public logOut(): Observable<any> {
    return this.http.post(
      environment.apiUrl + this.path + '/logout',
      {},
    );
  }
}
