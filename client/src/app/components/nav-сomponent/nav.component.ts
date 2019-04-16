import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'
import { NavService } from '../../services/nav.service'

@Component({
  selector:    'app-nav',
  templateUrl: './nav.component.html',
  styleUrls:   ['./nav.component.less']
})
export class NavComponent implements OnInit {

  constructor(private loginService: LoginService,
              private navService: NavService) { }

  ngOnInit() {
    console.log('nav-сomponent component loaded')
  }

}
