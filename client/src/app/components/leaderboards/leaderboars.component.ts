import { Component, OnInit } from '@angular/core'
import { GameService } from '../../services/game.service'
import { Observable } from 'rxjs'
import { GameResult } from '../../dtos/GameResult'

@Component({
  selector:    'app-leaderboars',
  templateUrl: './leaderboars.component.html',
  styleUrls:   ['./leaderboars.component.less']
})
export class LeaderboarsComponent implements OnInit {

  gameResults$: Observable<GameResult[]>

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameResults$ = this.gameService.getResults()
  }

}
