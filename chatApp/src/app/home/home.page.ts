import {Component, OnDestroy} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {NavController} from '@ionic/angular';
import {UserData} from '../UserData';
import {NavigationExtras} from '@angular/router';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {RoomData} from '../RoomData';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

    myuserAuth: firebase.User;
    myuser: UserData;
    userlist: Array<UserData> = Array();
    roomList: Array<RoomData>;
    localUserAuth;

    getMyRooms: Subscription;
    getMyUserSub: Subscription;

    constructor(
        private myfirestore: AngularFirestore,
        private firebaseService: FirebaseService,
        private nav: NavController,
    ) {
        if (!firebaseService.isLoggedIn) {
            this.nav.navigateRoot(['login']);
        }
        if (firebaseService.isEmailVerified === false) {
            this.nav.navigateForward(['email-verification']);
        }

        this.myuserAuth = JSON.parse(localStorage.getItem('userAuth'));

        this.getMyRooms = firebaseService.getRooms(this.myuserAuth.uid).subscribe(data => {
            console.log(data);
            this.roomList = data.map(value => {
                return {
                    uid: value.payload.doc.data()['uid'.toString()],
                    user1: value.payload.doc.data()['user1'.toString()],
                    user2: value.payload.doc.data()['user2'.toString()],
                    usersId: value.payload.doc.data()['usersId'.toString()],
                };
            });
            console.log(this.roomList);
        });

        this.getMyUserSub = firebaseService.GetUser(this.myuserAuth.uid).subscribe(data => {
            console.log(data);
            this.myuser = {
                uid: data.uid,
                naissance: data.naissance,
                email: data.email,
                nom: data.nom,
                prenom: data.prenom,
                nomUtilisateur: data.nomUtilisateur,
                adresse: data.adresse,
                cp: data.cp,
                ville: data.ville,
            };
            console.log(this.myuser);
        });
    }

    openUserList() {
        const extra: NavigationExtras = {
            state: {
                user: this.myuser
            }
        };
        console.log(extra.state.user);
        this.nav.navigateForward(['home/users'], extra);
    }

    goChat(myRoom: RoomData) {
        const extra: NavigationExtras = {
            state: {
                room: myRoom,
                user: this.myuser
            }
        };
        this.nav.navigateForward(['home/room'], extra);
    }

    ngOnDestroy() {
        this.getMyRooms.unsubscribe();
        this.getMyUserSub.unsubscribe();
    }

    goProfile() {
        const extra: NavigationExtras = {
            state: {
                user: this.myuser
            }
        };
        this.nav.navigateForward(['home/my-user'], extra);
    }
}
