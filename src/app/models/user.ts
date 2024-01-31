//logged in users from gmail
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 } 
// storesd users in real time databse
 export interface AppUser {
    name: string;
    email: string;
    isAdmin: boolean;
 }