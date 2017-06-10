

import {Injectable} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";


@Injectable()

export class CommonService{
    username: string;

    constructor(private localSt: LocalStorageService){

        this.username = this.localSt.retrieve('username')

        this.localSt.observe('username')
            .subscribe((value) => this.username = value);
    }
}