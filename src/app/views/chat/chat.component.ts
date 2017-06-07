import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  messageList: string[] =  [];
  currentFrq = '';
  currentMsg = '';

  constructor(private activatedRoute: ActivatedRoute, private socketService: SocketService) { }

  send() {
    this.socketService.socket.emit('send', {msg: this.currentMsg, usr: this.socketService.username, frq: this.currentFrq });
    this.currentMsg = '';
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      this.currentFrq = params['frq'];

      this.socketService.join(this.socketService.username,  params['frq']);
      this.socketService.listen('chat').subscribe(res => {
        console.log(res);
        this.messageList.push(`${res.usr}: ${res.msg}`);
      });


    })
  }

}
