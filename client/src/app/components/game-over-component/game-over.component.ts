import { Component, OnInit, ViewChild } from '@angular/core'
import { GameService } from '../../services/game.service'
import { GameResult } from '../../dtos/GameResult'

@Component({
  selector:    'app-game-over-component',
  templateUrl: './game-over.component.html',
  styleUrls:   ['./game-over.component.less']
})
export class GameOverComponent implements OnInit {

  @ViewChild('gameOverModal')
  modal
  public login = ''

  constructor(private gameService: GameService) {}

  getScore() {
    const data = this.modal.getData()
    if (data) {
      return data.score
    }
    return null
  }

  getLogin() {
    return this.login
  }

  ngOnInit() {
  }

  saveResult() {
    this.gameService.postResult(new GameResult(this.getLogin(), this.getScore()))
        .subscribe(() => this.getScore())
  }

  close() {
    this.modal.close()
  }

  open(score: number) {
    this.modal.open()
    this.modal.setData({score})
  }
}
