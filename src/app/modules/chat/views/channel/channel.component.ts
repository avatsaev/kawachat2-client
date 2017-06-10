import { Component, OnInit } from '@angular/core';
import {Chat} from '../../models/chat';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {CommonService} from "../../../../services/common.service";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.sass'],
  moduleId: module.id,
})
export class ChannelComponent implements OnInit {

  currentChat: Chat;

  currentMsg = '';

  constructor(
      private activatedRoute: ActivatedRoute,
      public chatService: ChatService,
      public commonService: CommonService
  ) { }

  send() {
    if (this.currentMsg.length) {

      this.chatService.socket.emit('send', {msg: this.currentMsg, usr: this.commonService.username, frq: this.currentChat.frq });
      this.currentChat.msgList.push({msg: this.currentMsg, usr: this.commonService.username, frq: this.currentChat.frq});
      this.currentMsg = '';
    }
  }

  ngOnInit() {

    console.log(this.commonService)

    this.activatedRoute.params.subscribe(params => {
      this.chatService.join(params['frq']);
      this.currentChat = this.chatService.getChat(params['frq']);
    })
  }

}
