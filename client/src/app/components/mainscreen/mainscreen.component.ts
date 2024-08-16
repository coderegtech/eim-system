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

  @Input({ required: true }) tableHeadNames!: string[];
  @Input({ required: true }) tableData!: any[];
  @Input({ required: true }) dataItems!: any[];

  @Input() addBtnText?: string;
  @Input() hasFilter?: boolean;
  @Input() filter?: any[];
  @Input() filterName?: string;
  @Input() hasImage?: boolean;
  @Input() isLoading?: boolean;

  inputValue: string = '';
  @Output() inputTextValue = new EventEmitter<string>();
  @Output() editedItemId = new EventEmitter<number>();
  @Output() removedItemId = new EventEmitter<number>();

  constructor(private modalService: ModalService) {}

  searchItem() {
    this.inputTextValue.emit(this.inputValue);
  }

  openModal() {
    this.modalService.setActiveModal(true);
  }

  delBtn(id: number) {
    this.removedItemId.emit(id);
  }

  editBtn(id: number) {
    this.editedItemId.emit(id);
  }
}
