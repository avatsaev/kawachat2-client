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

      this.chatService.activeChat.send(this.currentMsg, this.commonService.username);
      this.currentMsg = "";
    }
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.chatService.join(params['frq']);

    })
  }

}
