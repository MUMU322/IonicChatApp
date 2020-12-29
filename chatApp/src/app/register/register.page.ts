import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UserData} from '../UserData';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerUserForm: any;

    constructor(
        public fireServ: FirebaseService,
        public formBuilder: FormBuilder,
        private nav: NavController
    ) {
        this.registerUserForm = this.formBuilder.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            pseudo: ['', Validators.required],
            adresse: ['', Validators.required],
            codePostal: ['', Validators.required],
            ville: ['', Validators.required],
            dateNaissance: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
    }

    logNewUser() {
        const form = this.registerUserForm.value;
        const user: UserData = {
           uid : null,
            prenom: form.prenom,
            nom: form.nom,
            nomUtilisateur: form.pseudo,
            adresse: form.adresse,
            cp: form.codePostal,
            ville: form.ville,
            naissance: form.dateNaissance,
            email: form.email
        };
        this.fireServ.RegisterUserAuth(user, form.password)
            .then((res) => {
                console.log(res);
                // console.log(res.user.email);
                // console.log(res.user.emailVerified);
                this.nav.navigateForward(['email-verification']);
            }).catch((error) => {
            console.log(error);
            console.log(this.registerUserForm.value.email);
                window.alert(error.message);
        });
    }
}
