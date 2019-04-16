import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Direction } from './game/enums'
import { DefaultRandom } from './helpers/random'
import { Game2048 } from './game/game2048'
import { RenderConsole } from './render-console/render-console'
import { RenderSVG } from './render-svg/render-svg'
import { ensure } from './helpers/syntax'
import { enableNavbarToggle, toggleMainNavbar, triggerModal } from './styles/bulma-helpers'
import { GameEvent, GameOverEvent } from './game/events'
import { NgxSmartModalService } from 'ngx-smart-modal'
import { GameOverComponent } from './components/game-over-component/game-over.component'


@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'client'
  game: Game2048
  @ViewChild('gameOverComponent')
  gameOverComponent: GameOverComponent

  constructor(private modalService: NgxSmartModalService) {

  }

  async ngOnInit() {
  }

  private showGameOverDialog(): void {
    this.gameOverComponent.open(this.game.getScores())
  }

  public ngAfterViewInit(): void {
    // this.showGameOverDialog()
  }
}
