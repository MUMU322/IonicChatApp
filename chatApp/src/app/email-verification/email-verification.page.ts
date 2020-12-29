import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {NavController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.page.html',
    styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

    constructor(
        public fireServ: FirebaseService,
        private nav: NavController,
        public toastController: ToastController

    ) {
    }

    async textToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        await toast.present();
    }


    ngOnInit() {
    }
    sendNewEmail(){
        this.fireServ.sendVerificationEmail();
        this.textToast(' new verification email sent !!');
    }
    checkEmailVerified(){
            this.nav.navigateRoot(['home']);
    }


}
