import { Injectable } from '@angular/core'
import { BaseService } from './base-service.service'
import { ClassTransformer } from 'class-transformer'
import { HttpClient } from '@angular/common/http'
import { Config } from '../сonfig'
import { GameResult } from '../dtos/GameResult'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {
  constructor(http: HttpClient, config: Config, json: ClassTransformer) {
    super(http, config, json, 'game')
  }

  public getResults(): Observable<GameResult[]> {
    return this.http.get(this.buildUrl()).pipe(
      map(o => this.json.plainToClass(GameResult, o as Object[]))
    )
  }

  public postResult(gameResult: GameResult): Observable<number> {
    return this.http.post<number>(this.buildUrl(), gameResult)
  }
}
