import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class Items {
  currentUser;
  defaultItem: any = {
    "id": null,
    "content": "",
    "image": "",
  };

  constructor(public api: Api, public storage: Storage) {
    this.storage.get('currentUser')
      .then(val => this.currentUser = val);
  }

  query(params?: any) {
    return this.api.get('api/' + this.currentUser.id + '/notes', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
