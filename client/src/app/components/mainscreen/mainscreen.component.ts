import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css'],
})
export class MainscreenComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) inputPlaceHolder!: string;
  @Input({ required: true }) dataCounts!: number;
  @Input({ required: false }) hasFilter?: boolean;
  @Input({ required: false }) filter?: any[];
  @Input({ required: false }) filterName?: string;
  @Input({ required: false }) hasImage?: boolean;
  @Input({ required: false }) isLoading?: boolean;

  @Input({ required: true }) addBtnText!: string;
  @Input({ required: true }) tableHeadNames!: string[];
  @Input({ required: true }) tableData!: any[];
  @Input({ required: true }) dataItems!: any[];

  inputValue: string = '';
  @Output() inputTextValue = new EventEmitter<string>();
  getInputValue() {
    this.inputTextValue.emit(this.inputValue);
  }

  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.setActiveModal(true);
  }
}
