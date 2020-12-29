import {Component, Input, OnInit} from '@angular/core';
import {MessageData, RoomData} from '../RoomData';
import {UserData} from '../UserData';
import {FirebaseService} from '../services/firebase.service';

@Component({
    selector: 'app-message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit {

    @Input('data') message: MessageData;
    @Input('myUser') myUser: UserData;
    @Input('myRoom') room: RoomData;

    date: Date;
    constructor(
        private firebaseService: FirebaseService,
    ) {
    }

    ngOnInit() {
    }

    trashMessage() {
        console.log(this.message.id);
        this.firebaseService.deleteMessage(this.room.uid, this.message.id);
    }
}
