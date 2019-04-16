import { Component, OnInit } from '@angular/core'
import { enableNavbarToggle } from '../../styles/bulma-helpers'
import { ensure } from '../../helpers/syntax'
import { Game2048 } from '../../game/game2048'
import { DefaultRandom } from '../../helpers/random'
import { RenderConsole } from '../../render-console/render-console'
import { RenderSVG } from '../../render-svg/render-svg'
import { Direction } from '../../game/enums'
import { GameOverEvent } from '../../game/events'

const GAME_STATE_LOCALSTORAGE_KEY = 'game_state_11'
declare const Mousetrap: any

@Component({
  selector:    'app-game',
  templateUrl: './game.component.html',
  styleUrls:   ['./game.component.less']
})
export class GameComponent implements OnInit {
  game: Game2048 = new Game2048(4, new DefaultRandom())

  constructor() { }

  async ngOnInit() {
    await this.gameMain()
  }

  async gameMain() {
    enableNavbarToggle()
    ensure(document.getElementById('loading-indicator')).remove()
    ensure(document.getElementById('game-content')).style.visibility = 'visible'

    const renderConsole = new RenderConsole(this.game)
    const renderSVG = new RenderSVG(this.game)
    const moveAction = (direction: Direction) => () => this.game.queueAction({type: 'MOVE', direction})

    Mousetrap.bind('up', moveAction(Direction.Up))
    Mousetrap.bind('down', moveAction(Direction.Down))
    Mousetrap.bind('left', moveAction(Direction.Left))
    Mousetrap.bind('right', moveAction(Direction.Right))

    // ensure(document.getElementById('btn-up')).addEventListener(
    //   'click',
    //   moveAction(Direction.Up)
    // )
    // ensure(document.getElementById('btn-down')).addEventListener(
    //   'click',
    //   moveAction(Direction.Down)
    // )
    // ensure(document.getElementById('btn-left')).addEventListener(
    //   'click',
    //   moveAction(Direction.Left)
    // )
    // ensure(document.getElementById('btn-right')).addEventListener(
    //   'click',
    //   moveAction(Direction.Right)
    // )
    ensure(document.getElementById('btn-new-game')).addEventListener(
      'click',
      () => {
        this.game.queueAction({type: 'START', serializedState: ''})
        // toggleMainNavbar()
      }
    )

    // const hammer = new Hammer(document.body, {
    //   recognizers: [[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]]
    // })
    // hammer.on('swipe', function (e) {
    //   let dir
    //   switch (e.direction) {
    //     case Hammer.DIRECTION_UP:
    //       dir = Direction.Up
    //       break
    //     case Hammer.DIRECTION_DOWN:
    //       dir = Direction.Down
    //       break
    //     case Hammer.DIRECTION_LEFT:
    //       dir = Direction.Left
    //       break
    //     case Hammer.DIRECTION_RIGHT:
    //       dir = Direction.Right
    //       break
    //   }
    //   if (dir) {
    //     game.queueAction({type: 'MOVE', direction: dir})
    //   }
    // })

    await Promise.all([renderConsole.init(), renderSVG.init()])
    this.game.queueAction({
      type: 'START',
      serializedState:
            window.localStorage.getItem(GAME_STATE_LOCALSTORAGE_KEY) || ''
    })
    while (true) {
      const gameUpdates = await this.game.processAction()
      const serializedState = this.game.serialize()
      window.localStorage.setItem(GAME_STATE_LOCALSTORAGE_KEY, serializedState)
      await Promise.all([
        renderConsole.update(gameUpdates),
        renderSVG.update(gameUpdates)
      ])
      if (gameUpdates.some(value => value instanceof GameOverEvent)) {
        // this.showGameOverDialog()
      }
    }
  }

  public async restart() {
    this.game.queueAction({type: 'START', serializedState: ''})
  }
}
