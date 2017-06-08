import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
export class Chat {
  frq: string;
  chatListener: Observable<any>;
  chatSub: Subscription;
  msgList: any[] = [];

  constructor(frq: string, listener: Observable<any>) {
    this.frq = frq;
    this.chatListener = listener;
    this.chatSub = this.chatListener.subscribe(res => this.msgList.push(res));
  }
}
