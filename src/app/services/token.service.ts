import { inject, Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private cookie = inject(CookieService);

  constructor() { }

  saveToken(token: string) {
    this.cookie.set('token-trello', token, { expires: 1, path: '/' });
  }

  getToken() {
    const token = this.cookie.get('token-trello');
    return token;
  }

  removeToken() {
    this.cookie.delete('token-trello');
  }
}
