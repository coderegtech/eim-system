import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css'],
})
export class AlertboxComponent implements OnInit {
  faXmark = faXmark;
  @Input() message!: string;
  @Input() status!: string;

  active: boolean = false;

  ngOnInit(): void {
    this.showAlert();
  }

  showAlert() {
    this.status = this.status === 'success' ? 'success' : 'error';
    this.active = true;

    setTimeout(() => {
      this.active = false;
    }, 5000);
  }

  closeAlert() {
    this.active = false;
  }
}
