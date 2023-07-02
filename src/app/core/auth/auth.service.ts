import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl =
    'http://bacarotour.altervista.org/backend/login.php';

  // private readonly apiUrl = 'http://localhost:80/progettoBacari/login.php';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body);
  }

  checkTheToken() {
    const cookieValue = this.cookieService.get('token');
    console.log(cookieValue);
  }
}
