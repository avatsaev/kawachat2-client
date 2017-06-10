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


  currentMsg = '';

  constructor(
      private activatedRoute: ActivatedRoute,
      public chatService: ChatService,
      public commonService: CommonService
  ) { }

  send() {
    if (this.currentMsg.length) {

      this.chatService.socket.emit('send', {msg: this.currentMsg, usr: this.commonService.username, frq: this.chatService.activeChat.frq });
      this.chatService.activeChat.msgList.push({msg: this.currentMsg, usr: this.commonService.username, frq: this.chatService.activeChat.frq});
      this.currentMsg = '';
    }
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      this.chatService.join(params['frq']);
      this.chatService.activeChat = this.chatService.getChat(params['frq']);
    })
  }

}
