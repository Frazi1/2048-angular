import { Injectable } from '@angular/core'
import { Config } from '../сonfig'
import { HttpClient } from '@angular/common/http'
import { ClassTransformer } from 'class-transformer'

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _endpoint: string

  constructor(protected http: HttpClient,
              private config: Config,
              protected json: ClassTransformer,
              protected endpointPostfix) {
    this._endpoint = `${this.config.serverUrl}/${endpointPostfix}`
  }

  get endpoint(): string {
    return this._endpoint
  }

  protected buildUrl(...args: (string | number)[]): string {
    let url = this.endpoint
    if (!url.endsWith('/') && args.length > 0) {
      url += '/'
    }
    return url + args.join('/')
  }
}
