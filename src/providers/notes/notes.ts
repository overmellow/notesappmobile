import { Injectable } from '@angular/core';

import { Note } from '../../models/note';
import { Api } from '../api/api';
import { User } from '..';

@Injectable()
export class Notes {
  defaultItem: Note = {
    id: null,
    content: "",
    image: "",
  };

  constructor(public api: Api, public user: User) {
  }

  query(params?: any) {
    return this.api.get('api/' + this.user._user.id + '/notes', params);
  }

  add(note: Note) {
    return this.api.post('api/' + this.user._user.id + '/notes', note);
  }

  delete(note: Note) {
    return this.api.delete('api/' + this.user._user.id + '/notes/' + note.id);
  }

}
