import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GameComponent } from './components/game/game.component'
import { LeaderboarsComponent } from './components/leaderboards/leaderboars.component'
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'leaderboards', component: LeaderboarsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: LoginComponent, data: {isRegistrationState: true}}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
