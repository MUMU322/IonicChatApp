import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FirebaseService} from '../services/firebase.service';
import {UserData} from '../UserData';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-my-user',
    templateUrl: './my-user.page.html',
    styleUrls: ['./my-user.page.scss'],
})
export class MyUserPage implements OnInit {
    myUser: UserData;

    constructor(
        private nav: NavController,
        private firebaseService: FirebaseService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {
        if (!this.firebaseService.isLoggedIn) {
            this.nav.navigateForward(['login']);
        }

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.myUser = this.router.getCurrentNavigation().extras.state.user;
            }
        });
    }

    goBack() {
        this.nav.navigateBack(['home']);
    }

    logout() {
        localStorage.clear();
        this.nav.navigateRoot(['login']);
    }
}
