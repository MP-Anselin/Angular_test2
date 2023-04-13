import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class FriendListClient {
  private readonly path: string;

  constructor(private http: HttpClient) {
    this.path = "/friend"
  }

  public getFriendList(): Observable<any> {
    return this.http.get(
      environment.apiUrl + this.path + 's',
    );
  }

  public addFriend(userId: string): Observable<string> {
    return this.http.post(
      environment.apiUrl + this.path + '/add',
      {
        friend_id: userId,
        friend_ship_status: 2
      },
      {responseType: 'text'}
    );
  }

  public removeFriend(userId: string): Observable<any> {
    return this.http.delete(
      environment.apiUrl + this.path + '/remove/' + userId,
    );
  }
}
