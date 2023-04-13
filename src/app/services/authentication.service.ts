import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationClient} from './clients/authentication.client';
import CreateUserDto from "./clients/dto/createUser.dto";
import LogInDto from "./clients/dto/logIn.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {IUserCard} from "./clients/interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public userOnline = 'currentUser';
  private currentUserSubject!: BehaviorSubject<IUserCard>;
  public currentUser!: Observable<IUserCard>;

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {
    const cuUser = localStorage.getItem(this.userOnline)
    if (cuUser) {
      this.currentUserSubject = new BehaviorSubject<IUserCard>(JSON.parse(cuUser));
      this.currentUser = this.currentUserSubject.asObservable();
    }else{
      this.currentUserSubject = new BehaviorSubject<any>(null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): IUserCard {
    return this.currentUserSubject.value;
  }


  public login(userData: LogInDto): void {
    this.authenticationClient
      .login(userData)
      .subscribe((userInfo) => {
      localStorage.setItem(this.userOnline, JSON.stringify(userInfo));
      this.currentUserSubject.next(userInfo);
      this.router.navigate(['/dashboard']);
    });
  }

  public register(userData: CreateUserDto): void {
    this.authenticationClient
      .register(userData)
      .subscribe((userInfo) => {
        localStorage.setItem(this.userOnline, JSON.stringify(userInfo));
        this.currentUserSubject.next(userInfo);
        this.router.navigate(['/dashboard']);
      });
  }

  public logout() {
    localStorage.removeItem(this.userOnline);
    this.authenticationClient.logOut().subscribe(()=> {
      localStorage.removeItem(this.userOnline);
      this.router.navigate(['/login']);
    });
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.userOnline);
    return token != null && token.length > 0;
  }
}
