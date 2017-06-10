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
  featuredChats = [];

  constructor(private commonService: CommonService, private http: Http) {
    this.socket = io(environment.socket.baseUrl, environment.socket.opts);
    this.socket.on('connect', () => this.socketConnected$.next(true));
    this.socket.on('disconnect', () => this.socketConnected$.next(false));
    [
      'programming',
      'graphic_design',
      'gaming',
      'random'
    ].map(frq => this.featuredChats.push(this.generateChat(frq)));

    this.getServerStats().subscribe(res => {
      this.totalClients = res.clientsCount;
      this.totalRooms = res.roomsCount;
    });

    this.globalListen('statsUpdate').subscribe(res => {
      this.totalRooms  = res.roomsCount;
      this.totalClients = res.clientsCount;
    });

    this.socketConnected$.asObservable().subscribe( connected => {
      console.log('Socket connected: ', connected);
    });
  }

  join(frq: string) {

    if (!this.commonService.username) {
      this.commonService.username = UUID.UUID();
    }


    this.socket.emit('join', { frq, username: this.commonService.username });
    let chat = this.getChat(frq);
    this.activeChat = chat;
    if (!chat) {

      chat = this.generateChat(frq);


      // NOTE: send call to the event loop
      setTimeout(() => {
        // TODO: investigate bug, when this call isn't sent to the event loop, the request doesn't execute when coming to a chat from external link
        this.getFrqStats(frq).subscribe(res => {
          console.log('got response...');
          console.log(res);
          chat.totalClients = res.clientsCount;
        });
      });




      this.activeChats.push(chat);
    }
  }

  leave(frq: string) {
    this.socket.emit('leave', {frq});
    this.activeChats = this.activeChats.filter( c => c.frq !== frq);
  }


  generateChat(frq: string): Chat {
    let chat = this.getChat(frq);

    if (!chat) {
      chat = new Chat(
        frq,
        this.listen('chat', frq),
        this.listen('frqUpdate', frq)
      );
    }

    return chat;
  }


  getServerStats(): Observable<any> {
    return this.http.get(`${environment.api.baseUrl}/stats`).map(res => res.json());
  }

  getFrqStats(frq: string): Observable<any> {
    return this.http.get(`${environment.api.baseUrl}/room/${frq}/stats`).map(res => res.json());
  }

  getChat(frq) {
    return this.activeChats.filter(c => c.frq === frq)[0];
  }



  listen(event: string, frq: string): Observable<any> {

    return new Observable(observer => {

      this.socket.on(event, data => {
        console.log('incoming for', event, data);
        if (data.frq === frq) {
          observer.next(data);
        }
      });

      // observable is disposed
      return () => {
        this.socket.off(event);
      }

    });

  }

  globalListen(event: string): Observable<any> {

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
