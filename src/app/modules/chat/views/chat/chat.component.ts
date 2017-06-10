import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
  moduleId: module.id,
})
export class ChatComponent implements OnInit {



  constructor(private router: Router, public chatService: ChatService) { }

  leaveChat(frq) {
    this.chatService.leave(frq);
    if (frq === this.chatService.activeChat.frq) {
      this.router.navigate(['/chat']);
    }

  }

  ngOnInit() {

  }

}
