import { Component, ElementRef, ViewChild/**/, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Notes } from '../../providers';
import { Note } from '../../models/note';
import { FilesService } from '../../providers/files-service/files-service';
import { WindowRef } from '../../providers/window-ref/window-ref';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage implements OnInit {
  note: Note;
  private _window: Window;
  @ViewChild('noteImage') image: ElementRef;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    notes: Notes,
    public filesService: FilesService,
    private windowRefService: WindowRef
  ) {
    this.note = navParams.get('note') || notes.defaultItem;
    this._window = this.windowRefService.nativeWindow;
  }

  ngOnInit() {
    this._window = this.windowRefService.nativeWindow;
    this.getImage(this.note.image);
  }

  getImage(imageName: string) {
    this.filesService.getImage(imageName)
      .subscribe(res => {
        this.image.nativeElement.src = this._window.URL.createObjectURL(res);
      });
  }

}
