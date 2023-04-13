import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IUserCard} from "./interfaces/user.interface";

@Injectable()
export class UserClient {
  private readonly path: string;

  constructor(private http: HttpClient) {
    this.path = "/user"
  }

  public getUser() {
    return this.http.get(
      environment.apiUrl + this.path,
    );
  }

  public getAllUser(): Observable<any> {
    return this.http.get(
      environment.apiUrl + this.path + 's',
    );
  }

  public updateUserData(userData: IUserCard): Observable<any> {
    return this.http.patch(
      environment.apiUrl + this.path,
      userData,
    );
  }
}
