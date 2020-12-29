import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {FirebaseService} from '../services/firebase.service';
import {LoginResult} from '../UserData';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: any;

    constructor(
        public fireServ: FirebaseService,
        public formBuilder: FormBuilder,
        private  nav: NavController,
        private alertController: AlertController
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    async showTextAlert(error: Error) {
        const alert = await this.alertController.create({
            header: 'Login Problem',
            subHeader: error.name,
            message: error.message,
            buttons: ['OK']
        });

        await alert.present();
    }

    ngOnInit() {
    }

    logLogin() {
        try{
            this.fireServ.LogIn(this.loginForm.value.email, this.loginForm.value.password)
                .then(value => {
                    if (value.user.emailVerified){
                        this.nav.navigateRoot(['home']);
                    }
                    else {
                        this.nav.navigateForward(['email-verification']);
                    }
                });
        }
        catch (error){
            this.showTextAlert(error);
            }
    }
    signInButton(){
        this.nav.navigateForward(['register']);
    }
}
