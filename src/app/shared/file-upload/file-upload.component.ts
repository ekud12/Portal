import { Component, EventEmitter, OnInit } from '@angular/core';
import { httpRoutes } from '@http-routes';
import { UploadFile, UploadInput, UploadOutput, UploaderOptions, humanizeBytes } from 'ngx-uploader';
import { BackendService } from '../../core/services/backend.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  fileName = 'גרור קובץ לכאן או ';
  inputFileName = 'טען קובץ ידנית';
  uploadClass = 'drop-container';
  hideInput = false;

  constructor(private backendService: BackendService) {
    this.options = {
      concurrency: 1,
      allowedContentTypes: [
        'application/pdf',
        'application/x-pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ]
    };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {}

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      // add file to array when added
      this.files.push(output.file);
      this.fileName = this.files[0].name;
      this.uploadClass = 'drop-container-good';
      this.hideInput = true;
      /** add logic to send file to server */
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.fileName = `הקובץ ${output.file.name}, הינו בפורמט לא נתמך.`;
      this.uploadClass = 'drop-container-bad';
      this.hideInput = true;
    }
  }

  startUpload(): void {
    const formData: FormData = new FormData();
    console.log(this.files[0]);
    formData.append('file', this.files[0].nativeFile, 'testFile');
    console.log(formData.get('file'));
    this.backendService.post(httpRoutes.FILES_UPLOAD_SUMMARY, { body: formData });
    const event: UploadInput = {
      type: 'uploadFile',
      url: 'http://localhost/PortalSapakimAPI/api/files/UploadSummary',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
