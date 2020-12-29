import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, NavigationExtras, Router, RouterModule, Routes} from '@angular/router';
import {UserData} from '../UserData';
import {parseArguments} from '@angular/cli/models/parser';
import {NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
    userlist: Array<UserData>;
    myUser: UserData;

    userListSub: Subscription;

    constructor(
        private firebaseService: FirebaseService,
        private  route: ActivatedRoute,
        private router: Router,
        private nav: NavController,
    ) {
    }

    ngOnInit() {

        if (!this.firebaseService.isLoggedIn) {
            this.nav.navigateForward(['login']);
        }

        this.userListSub = this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.myUser = this.router.getCurrentNavigation().extras.state.user;
            }
        });

        this.firebaseService.users.subscribe(data => {
            this.userlist = data.map(v => {
                return {
                    uid: v.payload.doc.data()['uid'.toString()],
                    nom: v.payload.doc.data()['nom'.toString()],
                    prenom: v.payload.doc.data()['prenom'.toString()],
                    nomUtilisateur: v.payload.doc.data()['nomUtilisateur'.toString()],
                    email: v.payload.doc.data()['email'.toString()],
                    adresse: v.payload.doc.data()['adresse'.toString()],
                    cp: v.payload.doc.data()['cp'.toString()],
                    ville: v.payload.doc.data()['ville'.toString()],
                    naissance: v.payload.doc.data()['naissance'.toString()]
                };
            });
            console.log(this.userlist);
        });
    }

    goChat(user: UserData) {
        console.log(this.myUser);
        console.log(user);
        const myroom = this.firebaseService.setRoom(user, this.myUser);
        const extra: NavigationExtras = {
            state: {
                room: myroom,
                user: this.myUser
            }
        };
        this.nav.navigateForward(['home/room'], extra);
    }

    goBack() {
        this.nav.navigateBack(['home']);
    }

    ngOnDestroy() {
        this.userListSub.unsubscribe();
    }
}
