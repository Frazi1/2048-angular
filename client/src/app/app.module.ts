import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgxSmartModalModule } from 'ngx-smart-modal'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GameOverComponent } from './components/game-over-component/game-over.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ClassTransformer } from 'class-transformer'
import { NavComponent } from './components/nav-сomponent/nav.component';
import { GameComponent } from './components/game/game.component';
import { LeaderboarsComponent } from './components/leaderboards/leaderboars.component';
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    GameOverComponent,
    NavComponent,
    GameComponent,
    LeaderboarsComponent,
    LoginComponent
  ],
  imports:      [
    BrowserModule,
    AppRoutingModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers:    [
    {provide: ClassTransformer, useValue: new ClassTransformer()},
  ],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
