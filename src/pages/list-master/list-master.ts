import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Note[];

  constructor(public navCtrl: NavController, public notes: Notes, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    //this.currentItems = this.items.query();
    this.getNotes();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.getNotes();
  }

  ionViewOnE

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      console.log(item)
      if (item) {
        let note: Note = { id: null, content: item.content, image: item.image };
        this.notes.add(note)
          .subscribe((val) => {
            let toast = this.toastCtrl.create({
              message: 'Note Added!',
              duration: 3000,
              position: 'top'
            });
            toast.present();
            this.getNotes();
          })
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(note) {
    this.notes.delete(note).subscribe((val) => {
      let toast = this.toastCtrl.create({
        message: 'Note Deleted!',
        duration: 3000,
        position: 'top'
      });
      this.getNotes();
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(note: Note) {
    this.navCtrl.push('ItemDetailPage', {
      note: note
    });
  }

  doRefresh(refresher) {
    this.getNotes();
    refresher.complete();
  }

  getNotes() {
    this.notes.query()
      .subscribe(res => {
        this.currentItems = res['body'];
      });
  }
}
