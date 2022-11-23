import { Component, OnInit , ViewChild} from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
@ViewChild('data') dataModal;

  constructor() { }

  ngOnInit(): void {
  }
  showModal(){
    this.dataModal.show();

  }
  closeModal(){
    this.dataModal.hide();

  }
  modalShow(){
    this.showModal();
  }



}
