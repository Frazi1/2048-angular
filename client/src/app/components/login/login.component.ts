import { Component, OnDestroy, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'
import { Subject } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap, takeUntil, tap } from 'rxjs/operators'

@Component({
  selector:    'app-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  login: string
  password: string

  isRegistrationState = false
  destroy$ = new Subject<void>()

  constructor(private loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroy$),
      tap(data => this.isRegistrationState = data.isRegistrationState === true)
    ).subscribe()
  }

  public signIn() {
    this.loginService.authenticate(this.login, this.password)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          res => this.router.navigate(['/']),
          err => alert(err.error.error)
        )
  }

  public signUp() {
    const savedLogin = this.login
    const savedPassword = this.password
    this.loginService.signUp(savedLogin, savedPassword)
        .pipe(
          takeUntil(this.destroy$),
          switchMap(_ => this.loginService.authenticate(savedLogin, savedPassword))
        )
        .subscribe(
          res => this.router.navigate(['/']),
          err => alert(err.error.error)
        )
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
  }

  public submit() {
    if (this.isRegistrationState) {
      this.signUp()
    } else {
      this.signIn()
    }

  }
}
