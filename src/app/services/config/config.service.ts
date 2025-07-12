import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private afs: AngularFirestore) {}

  /**
   * Retrieves the current value of the 'canVote' flag.
   * @returns An Observable emitting the boolean value of 'canVote'.
   */
  getCanVote(): Observable<boolean> {
    return this.afs
      .doc<{ canVote: boolean }>('config/voting')
      .valueChanges()
      .pipe(
        map(doc => doc?.canVote ?? false)
      );
  }

  /**
   * Updates the 'canVote' flag to the specified boolean value.
   * @param value The new boolean value to set for 'canVote'.
   * @returns A Promise that resolves when the update is complete.
   */
  setCanVote(value: boolean): Promise<void> {
    return this.afs
      .doc('config/voting')
      .update({ canVote: value });
  }
}

