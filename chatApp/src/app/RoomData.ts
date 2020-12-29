import {UserData} from './UserData';
import {Time} from '@angular/common';

export class RoomData{
    uid: string;
    usersId: Array<string>;
    user1: UserData;
    user2: UserData;

    constructor(uid: string, usersId: Array<string>, user1: UserData, user2: UserData) {
        this.uid = uid;
        this.usersId = usersId;
        this.user1 = user1;
        this.user2 = user2;
    }
}

export class MessageData{
    user: UserData;
    date: Date;
    message: string;
}
