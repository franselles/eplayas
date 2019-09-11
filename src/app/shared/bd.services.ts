import { Injectable } from '@angular/core';

@Injectable()
export class BdService {
    public dir_bd_: string;

    constructor() {
        // this.dir_bd_ = 'http://localhost:8080/api/';
        this.dir_bd_ = '/api/'; // heroku
    }
}
