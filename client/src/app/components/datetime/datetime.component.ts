import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
})
export class DatetimeComponent implements OnInit, OnDestroy {
  faCalendarDays = faCalendarDays;
  faClock = faClock;
  currentTime!: string;
  private timer: any;
  date = new Date().toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  ngOnInit() {
    this.updateTime();
    this.timer = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
