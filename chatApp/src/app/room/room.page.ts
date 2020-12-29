import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {MessageData, RoomData} from '../RoomData';
import {FormBuilder, Validators} from '@angular/forms';
import {UserData} from '../UserData';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-room',
    templateUrl: './room.page.html',
    styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit, OnDestroy {

    myRoom: RoomData;
    myUser: UserData;
    extUser: UserData;
    messagesList: Array<MessageData>;
    chatForm;
    messageSub: Subscription;

    constructor(
        private firebaseService: FirebaseService,
        private  route: ActivatedRoute,
        private router: Router,
        private nav: NavController,
        private formBuilder: FormBuilder
    ) {

        this.chatForm = this.formBuilder.group({
            text: ['', [Validators.required, Validators.maxLength(1000)]]
        });

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.myRoom = this.router.getCurrentNavigation().extras.state.room;
                this.myUser = this.router.getCurrentNavigation().extras.state.user;
            }
            this.extUser = this.myUser.uid === this.myRoom.user1.uid ? this.myRoom.user2 : this.myRoom.user1;
        });
    }

    ngOnInit() {
        this.messageSub = this.firebaseService.getMessages(this.myRoom).subscribe(data => {
            this.messagesList = data.map(value => {
                return {
                    id: value.payload.doc.id,
                    date: value.payload.doc.data()['date'.toString()],
                    user: value.payload.doc.data()['user'.toString()],
                    message: value.payload.doc.data()['message'.toString()]
                };
            });
            console.log(this.messagesList);
        });
    }

    sendMessage() {
        const myDate = new Date();
        const message: MessageData = {
            id : null,
            message: this.chatForm.value.text,
            user: this.myUser,
            date: myDate
        };
        this.firebaseService.sendMessage(this.myRoom, message);

    }

    goBack() {
        this.nav.navigateBack(['home']);
    }

    ngOnDestroy() {
        this.messageSub.unsubscribe();
    }
}

