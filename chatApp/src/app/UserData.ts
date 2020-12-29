import {Time} from '@angular/common';

export class UserData {
    adresse: string;
    cp: number;
    email: string;
    naissance: Time;
    nom: string;
    nomUtilisateur: string;
    prenom: number;
    uid: string;
    ville: string;

    constructor(uid: string, naissance: Time, email:string, nom: string, prenom: number, pseudo: string, address: string, codePostal: number, ville: string) {
        this.uid = uid;
        this.naissance = naissance;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = address;
        this.nomUtilisateur = pseudo;
        this.cp = codePostal;
        this.ville = ville;

    }
}

export class LoginResult {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

