import { Injectable }from '@angular/core';

@Injectable({ providedIn: 'root' }) export class MylocalstorageService {

    constructor() {}

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    setJson(key:string, data:any){
        try{
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            return true;
        }catch(e){
            return false;
        }
    }

    getJson(key:string){
        try{
            const data:any = localStorage.getItem(key);
            return JSON.parse(data);
        }catch(e){
            return null;
        }
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}
