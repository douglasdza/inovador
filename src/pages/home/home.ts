import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { DetalhesPage } from '../detalhes/detalhes';

import { Lista } from '../../model/lista';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ListaService } from '../../service/lista';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private lista: Lista = new Lista();
    //private lista = {};
    ref = firebase.database().ref("lista/");
    listas = [];
    //items: Observable<any[]>;
    listasList: Observable<any[]>

    private itemCollection: AngularFirestoreCollection<Lista>;
    items: Observable<Lista[]>

    resultado = 0;

  constructor(public navCtrl: NavController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      private listaService: ListaService,
      private afs: AngularFirestore) {

    this.itemCollection = afs.collection<Lista>('lista');
    this.items = this.listaService.getListas().valueChanges();


    this.items.subscribe((retorno) => {
      for(let i=0;i<retorno.length;i++){
         this.resultado += parseFloat(retorno[i].ra);
      }
        });
  }

  cadastrarComDialog(){
    this.alertCtrl.create({
      title: 'Cadastro',
      message: "Agua Consumida",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Recipiente',
        },
        {
          name: 'ra',
          placeholder: 'Quantidade ML',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.lista.nome = data.nome;
            this.lista.ra = data.ra;
            this.listaService.addLista(this.lista);
            this.toastCtrl.create({
              message: 'Recipiente '+this.lista.nome +" adicionado!!",
              duration: 3000
            }).present();
          }
        }
      ]
    }).present();
  }

  dialogRemover(im){
    this.alertCtrl.create({
        message: "DESEJA REALMENTE EXCLUIR?",
        buttons:[
          {
            text: 'Excluir',
            handler: data =>{
              this.listaService.removeLista(im);
            }
          }
        ]
    }).present();
  }
}
