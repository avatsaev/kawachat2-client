import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../modules/chat/services/chat.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  username: string;
  frq: string;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }


  join() {

    if (this.frq.length && this.username.length) {
      this.chatService.username = this.username;
      this.router.navigate(['/chat', this.frq]);
    }
  }
}
