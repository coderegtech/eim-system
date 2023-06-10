import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeModal = false;
  private modalStateSubject = new Subject<boolean>();

  constructor() {}

  setActiveModal(active: boolean) {
    this.activeModal = active;
    this.modalStateSubject.next(active);
  }

  getModalState() {
    return this.modalStateSubject.asObservable();
  }
}
