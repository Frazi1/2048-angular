import { Injectable } from '@angular/core'
import { BaseService } from './base-service.service'
import { ClassTransformer } from 'class-transformer'
import { Config } from '../сonfig'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserDto } from '../dtos/user-dto'
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private _userDto: UserDto

  constructor(http: HttpClient, config: Config, json: ClassTransformer) {
    super(http, config, json, 'auth')
  }

  public get userName(): string {
    return this._userDto.login
  }

  public isAuthenticated(): boolean {
    return this._userDto != null
  }

  public authenticate(login: string, password: string): Observable<UserDto> {
    const encodedCredentials = btoa(`${login}:${password}`)
    const headers = new HttpHeaders().set('Authorization', `Basic ${encodedCredentials}`)
    return this.http.post<UserDto | any>(this.buildUrl(), null, {headers: headers})
               .pipe(
                 map(res => this.json.plainToClass(UserDto, res as Object)),
                 tap(res => this._userDto = res)
               )
  }

  public logout(): void {
    this._userDto = null
  }
}
