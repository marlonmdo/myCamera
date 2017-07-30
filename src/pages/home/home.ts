import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imageUrl = '';
  
  constructor(public navCtrl: NavController, 
              private camera: Camera,
              private toastCtrl: ToastController,) {  }

  tiraFoto() {

    const options: CameraOptions = {
      quality : 75,
      destinationType : this.camera.DestinationType.FILE_URI,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit : false,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options)
      .then(
        (pictureTaken) => {
          const base64Image = 'data:image/jpeg;base64,' + pictureTaken;
          const currentName = pictureTaken.replace(/^.*[\\\/]/, '');
          //const path = pictureTaken.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          //console.log("Path: " + path);
          console.log("Nome atual: " + currentName);
          //console.log("Dir " + this.file.externalDataDirectory);
          //console.log("Dir " + this.file.dataDirectory);
          //console.log("ImageData: " + pictureTaken);
          //console.log("Nome nome: " + newFileName);
          this.imageUrl = pictureTaken;
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'Não foi possível obter foto. Tente novamente.',
            duration: 2500
          });
          toast.present();
        }
      );
  }

}