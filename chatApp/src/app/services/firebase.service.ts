import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserData} from '../UserData';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;
import {MessageData, RoomData} from '../RoomData';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    userAuth: firebase.User;

    constructor(
        private firestore: AngularFirestore,
        private fireAuth: AngularFireAuth) {
        // on subscribe a l'état de notre user dans notre bd
        this.fireAuth.authState.subscribe(myUserAuth => {
            if (myUserAuth) {
                localStorage.setItem('userAuth', JSON.stringify(myUserAuth));
                this.userAuth = myUserAuth;
                JSON.parse(localStorage.getItem('userAuth'));
            } else {
                localStorage.setItem('userAuth', null);
                this.userAuth = null;
                JSON.parse(localStorage.getItem('userAuth'));
            }
        });
    }

    async RegisterUserAuth(userData: UserData, password): Promise<firebase.auth.UserCredential> {
        let credential: any;
        this.fireAuth.createUserWithEmailAndPassword(userData.email, password)
            .then((res) => {
                localStorage.setItem('userAuth', JSON.stringify(res.user));
                console.log(localStorage.getItem('userAuth'));
                userData.uid = res.user.uid;
                credential = res.user;
                console.log(userData.uid);
                this.CreateUpdateUserData(userData);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
        return credential;
    }

    async CreateUpdateUserData(data: UserData) {
        this.firestore.collection('users').doc(data.uid).set(data)
            .then(_ => {
                localStorage.setItem('user', JSON.stringify(data));
            })
            .catch((error) => {
                localStorage.setItem('user', null);
                throw error;
            });
    }

    async LogIn(email, password): Promise<UserCredential> {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                localStorage.setItem('userAuth', JSON.stringify(res.user));
                this.GetUser(res.user.uid).subscribe(data => {
                    localStorage.setItem('user', JSON.stringify(data));
                });
                return res;
            })
            .catch(error => {
                throw error;
            });
    }

    GetUser(uid: string): Observable<any> {
        try {
            return this.firestore.collection('users').doc(uid).valueChanges();
        } catch (error) {
            throw error;
        }
    }


    get users() {
        return this.firestore.collection('users').snapshotChanges();
    }

    sendVerificationEmail() {
        firebase.auth().currentUser.sendEmailVerification();
    }

    // get the snapshot to observe
    getRooms(uid: string) {
        return this.firestore
            .collection('discussions', ref => ref.where('usersId', 'array-contains', uid))
            .snapshotChanges();
    }

    setRoom(myuser1: UserData, myuser2: UserData) {
        const docName = myuser1.uid + '||' + myuser2.uid;
        const doc = this.firestore.collection('discussions').doc(docName);
        const setDoc = doc.set({
            uid: docName,
            usersId: [myuser1.uid, myuser2.uid],
            user1: myuser1,
            user2: myuser2
        });

        const roomData: RoomData = {
            uid: docName,
            usersId: [myuser1.uid, myuser2.uid],
            user1: myuser1,
            user2: myuser2
        };
        return roomData;
    }

    getMessages(room: RoomData) {
        return this.firestore.collection('discussions').doc(room.uid).collection('messages').snapshotChanges();
    }

    sendMessage(room: RoomData, message: MessageData) {
        this.firestore.collection('discussions').doc(room.uid).collection('messages').add(message);
    }

    get isEmailVerified(): boolean {
        const local = JSON.parse(localStorage.getItem('userAuth')).isEmailVerified;
        return local;


    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('userAuth'));
        return (user !== null && user.emailVerified !== false);
    }

    /*getMessages(){
      this.firestore.collection('').snapshotChanges(['added']).subscribe(actions => {
        actions.forEach(action => {
          console.log('Item: ' + action.payload.doc.data()['text']);
        });
      });
    }*/
}
