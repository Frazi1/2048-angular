import { Component, OnInit } from '@angular/core'
import { Direction } from './game/enums'
import { DefaultRandom } from './helpers/random'
import { Game2048 } from './game/game2048'
import { RenderConsole } from './render-console/render-console'
import { RenderSVG } from './render-svg/render-svg'
import { ensure } from './helpers/syntax'
import { enableNavbarToggle, toggleMainNavbar, triggerModal } from './styles/bulma-helpers'


const GAME_STATE_LOCALSTORAGE_KEY = 'game_state_11'
declare const Mousetrap: any

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'client'
  game: Game2048


  async gameMain() {
    enableNavbarToggle()
    ensure(document.getElementById('loading-indicator')).remove()
    ensure(document.getElementById('game-content')).style.visibility = 'visible'

    this.game = new Game2048(4, new DefaultRandom())
    const renderConsole = new RenderConsole(this.game)
    const renderSVG = new RenderSVG(this.game)
    const moveAction = (direction: Direction) => () => this.game.queueAction({type: 'MOVE', direction})

    Mousetrap.bind('up', moveAction(Direction.Up))
    Mousetrap.bind('down', moveAction(Direction.Down))
    Mousetrap.bind('left', moveAction(Direction.Left))
    Mousetrap.bind('right', moveAction(Direction.Right))

    ensure(document.getElementById('btn-up')).addEventListener(
      'click',
      moveAction(Direction.Up)
    )
    ensure(document.getElementById('btn-down')).addEventListener(
      'click',
      moveAction(Direction.Down)
    )
    ensure(document.getElementById('btn-left')).addEventListener(
      'click',
      moveAction(Direction.Left)
    )
    ensure(document.getElementById('btn-right')).addEventListener(
      'click',
      moveAction(Direction.Right)
    )
    ensure(document.getElementById('btn-new-game')).addEventListener(
      'click',
      () => {
        this.game.queueAction({type: 'START', serializedState: ''})
        // toggleMainNavbar()
      }
    )
    ensure(document.getElementById('btn-about')).addEventListener(
      'click',
      function () {
        toggleMainNavbar()
        triggerModal('modal-about')
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
    }
  }

  ngOnInit(): void {
    this.gameMain()
  }

}
