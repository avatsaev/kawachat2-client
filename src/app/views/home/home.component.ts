import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../modules/chat/services/chat.service';
import {Router} from "@angular/router";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {

  username: string;
  frq: string;

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.username = this.commonService.username;
  }


  join() {

    if (this.frq.length && this.username.length) {
      this.commonService.username = this.username;
      this.router.navigate(['/chat', this.frq]);
    }
  }
}
