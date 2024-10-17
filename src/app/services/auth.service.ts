import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { ResponseLogin } from '@models/auth.model';
import { TokenService } from '@services/token.service';
import { switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  constructor() { }

  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

}
