import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { UploadFile, UploadInput, UploadOutput, UploaderOptions, humanizeBytes } from 'ngx-uploader';
import { fadeAnimation } from '../../core/animations';
import { BackendService } from '../../core/services/backend.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  animations: [fadeAnimation]
})
export class FileUploadComponent implements OnInit {
  // not all needed
  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  stage: string;
  fileName: string;
  inputFileName: string;
  uploadClass: string;
  hideInput: boolean;
  fileValid = false;
  @Input() title: string;
  @Input() fileUploadEndpointInput: string;
  @Input() allowedContentTypesInput: string[];
  @Input() maxFilesizeAllowed: number;

  constructor(private backendService: BackendService) {
    this.options = {
      concurrency: 1,
      allowedContentTypes: this.allowedContentTypesInput
    };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.reset();
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      if (output.file.size > this.maxFilesizeAllowed) {
        this.fileName = `הקובץ ${output.file.name}, חורג ממגבלת גודל הקובץ המקסימלי.`;
        this.uploadClass = 'drop-container-bad';
        this.hideInput = true;
      } else {
        this.files = [];
        this.files.push(output.file);
        this.fileName = this.files[0].name;
        this.uploadClass = 'drop-container-good';
        this.hideInput = true;
        this.fileValid = true;
      }
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.fileName = `הקובץ ${output.file.name}, הינו בפורמט לא נתמך.`;
      this.uploadClass = 'drop-container-bad';
      this.hideInput = true;
    }
  }

  startUpload(): void {
    console.log(this.files[0]);
    const formData: FormData = new FormData();
    formData.append('file', this.files[0].nativeFile, 'testFile');
    this.stage = 'loading';
    this.backendService.post(this.fileUploadEndpointInput, formData).subscribe(
      val => {
        console.log(val);
        this.stage = 'success';
      },
      error => {
        console.log(error);
        this.stage = 'error';
      }
    );
  }

  reset() {
    this.stage = 'none';
    this.files = [];
    this.fileName = 'גרור קובץ לכאן או ';
    this.inputFileName = 'טען קובץ ידנית';
    this.uploadClass = 'drop-container';
    this.hideInput = false;
    this.fileValid = false;
  }
}
