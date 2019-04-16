import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Config {
  private _serverUrl = 'http://localhost:8080'

  public get serverUrl(): string {
    return this._serverUrl
  }
}
