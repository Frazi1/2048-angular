import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'
import { noop } from 'rxjs'

@Component({
  selector:    'app-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.less']
})
export class LoginComponent implements OnInit {

  login: string
  password: string

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public signIn() {
    this.loginService.authenticate(this.login, this.password)
        .subscribe(noop, err => alert(err.error.error))
  }
}
