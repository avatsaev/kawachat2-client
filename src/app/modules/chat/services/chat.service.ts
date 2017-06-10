import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Chat} from '../models/chat';
import { UUID } from 'angular2-uuid';
import {CommonService} from '../../../services/common.service';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class ChatService {


  socket: any;

  totalClients = 0;
  totalRooms = 0;

  socketConnected$ = new BehaviorSubject<boolean>(false);
  activeChats = [];
  activeChat: Chat;
  featuredChats = [
    'programming',
    'graphic_design',
    'gaming',
    'random'
  ];

  constructor(private commonService: CommonService, private http: Http) {
    this.socket = io(environment.socket.baseUrl, environment.socket.opts);
    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => this.socketConnected$.next(false));


    this.getServerStats().subscribe(res => {
      this.totalClients = res.clientsCount;
      this.totalRooms = res.roomsCount;
    });

    this.listen('statsUpdate').subscribe(res => {
      this.totalRooms  = res.roomsCount;
      this.totalClients = res.clientsCount;
    });

    this.socketConnected$.asObservable().subscribe( connected => {
      console.log('Socket connected: ', connected);
    });
  }

  join(frq: string): Chat {

    if (!this.commonService.username) {
      this.commonService.username = UUID.UUID();
    }

    let chat = this.getChat(frq);

    if (!chat) {
      chat = new Chat(frq);
      this.activeChats.unshift(chat);
    }

    this.activeChat = chat;

    return chat;
  }

  leave(frq: string) {
    this.getChat(frq).leave();
    this.activeChats = this.activeChats.filter( c => c.frq !== frq);
  }

  getServerStats(): Observable<any> {
    return this.http.get(`${environment.api.baseUrl}/stats`).map(res => res.json());
  }

  getChat(frq): Chat {
    return this.activeChats.filter(c => c.frq === frq)[0];
  }


  listen(event: string): Observable<any> {

    return new Observable(observer => {

      this.socket.on(event, data => {
        observer.next(data);
      });

      // observable is disposed
      return () => {
        this.socket.off(event);
      }

    });

  }

}
