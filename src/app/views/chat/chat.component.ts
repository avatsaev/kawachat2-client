import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {Chat} from "../../models/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  currentChat: Chat;

  currentMsg = '';

  constructor(private activatedRoute: ActivatedRoute, public chatService: ChatService) { }

  send() {
    this.chatService.socket.emit('send', {msg: this.currentMsg, usr: this.chatService.username, frq: this.currentChat.frq });
    this.currentChat.msgList.push({msg: this.currentMsg, usr: this.chatService.username, frq: this.currentChat.frq});
    this.currentMsg = '';

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.chatService.join(this.chatService.username,  params['frq']);
      this.currentChat = this.chatService.getChat(params['frq']);
    })
  }

}
