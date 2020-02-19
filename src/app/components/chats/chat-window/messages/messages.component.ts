import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ToastsService } from '../../../../services/toasts.service';
import { HttpService } from '../../../../services/http.service';
import { types } from 'src/app/types/types';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input() message: types.Message;
  public selected: boolean = false;
  public editBlock: string;
  @Output() delete = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();
  constructor(
    private data: HttpService,
    public toastService: ToastsService
  ) { }

  ngOnInit() {
  }

  public over(id) {
    if (this.selected === false) {
      const checkId = 'check' + id;
      this.setVisability(checkId);
    }
  }
  public out(id) {
    const checkId = 'check' + id;
    this.removeVisability(checkId);
  }
  public click(id) {
    this.selected = !this.selected;
    const editBlockId = 'section' + id;
    const hightLight = 'selected' + id;
    const checkedId = 'check' + id;
    this.setVisability(checkedId);
    this.editBlock = 'section' + id;
    const elems = Array.from(document.getElementsByTagName('div'));
    elems.forEach((el) => {
      if (el.classList.contains('edit') === true && el.id !== editBlockId) {
        el.classList.remove('edit');
        el.classList.add('none-vis');
      }
      if (el.classList.contains('blue') === true && el.id !== hightLight)  {
        el.classList.remove('blue');
      }
      if (el.id === hightLight) {
        el.classList.add('blue');
      }
    });
  }
  public removeVisability(id) {
    const elems = Array.from(document.getElementsByTagName('i'));
    elems.forEach((el) => {
      if (el.id === id) {
        el.classList.add('none-vis');
      }
    });
  }
  public setVisability(id) {
    const elems = Array.from(document.getElementsByTagName('i'));
    elems.forEach((el) => {
      if (el.id === id) {
        el.classList.remove('none-vis');
      }
    });
  }

  public deleteMessage(options) {
    this.data.deleteMessageFromChat(options).subscribe((resp) => {
      if (resp.error == false) {
        this.toastService.openToastSuccess("Message deleted.");
        this.delete.emit(true);
      }
    });
  }

  public cancelEdit(id) {
    const elems = Array.from(document.getElementsByTagName('div'));
    const editBlockId = 'section' + id;
    const hightLight = 'selected' + id;
    this.editBlock = 'section';
    this.selected = !this.selected;
    elems.forEach((el) => {
      if (el.id === editBlockId) {
        el.classList.remove('edit');
        el.classList.add('none-vis');
      }
      if (el.id === hightLight)  {
        el.classList.remove('blue');
      }
    });
  }
  public editMess(data) {
    this.edit.emit(data);
    this.cancelEdit(data.id);
  }

  public cancelEditView(id) {
    this.cancelEdit(id);
    this.edit.emit({edit: false});
  }

}
