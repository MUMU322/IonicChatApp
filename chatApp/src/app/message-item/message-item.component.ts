import {Component, Input, OnInit} from '@angular/core';
import {MessageData} from '../RoomData';

@Component({
    selector: 'app-message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit {

    @Input('data') message: MessageData;

    constructor() {
    }

    ngOnInit() {
    }

}
