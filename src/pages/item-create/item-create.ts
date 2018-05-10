import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup/*, Validators*/ } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { Notes, FilesService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any = { content: '', image: '' };

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public notes: Notes,
    public toastCtrl: ToastController,
    public filesService: FilesService
  ) {
    this.form = formBuilder.group({
      profilePic: [''],
      // name: ['', Validators.required],
      content: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        // destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        console.log(data);
        this.fileUploadWithoutEvent(data);
        // this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    this.fileUpload(event);

    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  fileUpload(event) {
    const file: File = this.fileInput.nativeElement.files[0];
    this.filesService.uploadFile('api/files', file)
      .subscribe(res => {
        this.item.image = res['filename'];

        console.log(this.form.value)
        // this.getImage(this.note.image);
      });
  }


  fileUploadWithoutEvent(file: File) {
    this.filesService.uploadFile('api/files', file)
      .subscribe(res => {
        this.item.image = res['filename'];

        console.log(this.form.value)
        // this.getImage(this.note.image);
      });
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.item.content = this.form.value['content'];
    this.viewCtrl.dismiss(this.item);
  }
}
