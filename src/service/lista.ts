import { Injectable } from '@angular/core';
import { Lista } from '../model/lista';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ListaService {

  itemsCollection: AngularFirestoreCollection<Lista> = this.afs.collection<Lista>('lista');

  constructor(private afs: AngularFirestore) { }
  getListas() {
    return this.itemsCollection;
  }
  addLista(lista: Lista) {
    const id = this.afs.createId();
    lista.key = id;
    this.itemsCollection.doc(id).set(JSON.parse(JSON.stringify(lista)));
  }
  updateLista(lista: Lista) {
    return this.itemsCollection.doc(lista.key).update(lista);
  }
  removeLista(lista: Lista) {
    return this.itemsCollection.doc(lista.key).delete(lista);
  }
}
