import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { User } from '../model/user';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';
import { UploadFileService } from '../service/upload-file.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  username: string;
  updateProfile: User;
  isPractitioner = false;
  errorMessage: string;

  name: string;
  email: string;
  address: string;
  dateOfBorn: Date;
  phoneNumber: string;
  workingAddress: string;
  specialization: string;
  picture: string;

  minDate = new Date(1900,1,1);
  maxDate = new Date();

  constructor(private tokenService: TokenService, private patientService: PatientService,
              private toastr: ToastrService, private router: Router, private uploadService: UploadFileService,
              private https: HttpClient, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.updateProfile = new User();
    this.username = this.tokenService.getUserName();
    this.isPractitioner = this.tokenService.IsPractitioner();

    this.patientService.getProfileDetails(this.username)
    .subscribe(data => {
      this.updateProfile = data;
      this.name = this.updateProfile.patient.name;
      this.email = this.updateProfile.patient.email;
      this.address = this.updateProfile.patient.address;
      this.dateOfBorn = this.updateProfile.patient.dateOfBorn;
      this.phoneNumber = this.updateProfile.patient.phoneNumber;
      this.picture = this.updateProfile.patient.picture;
      this.preFilePath = this.preFilePath+this.username+'/'+this.picture;
      if(this.isPractitioner == true){
        this.workingAddress = this.updateProfile.practitioner.workingAddress;
        this.specialization = this.updateProfile.practitioner.specialization;
      }
    }, error => console.log(error));


  }

  editProfile() {
    this.updateProfile.patient.name = this.name;
    this.updateProfile.patient.email = this.email;
    this.updateProfile.patient.address = this.address;
    this.updateProfile.patient.dateOfBorn = this.dateOfBorn;
    this.updateProfile.patient.phoneNumber = this.phoneNumber;
    this.updateProfile.patient.picture = this.picture;
    this.preFilePath = this.preFilePath+this.username+'/'+this.picture;
    if(this.isPractitioner == true){
      this.updateProfile.practitioner.workingAddress = this.workingAddress;
      this.updateProfile.practitioner.specialization = this.specialization;
    }

    this.patientService.updateProfile(this.username, this.updateProfile)
      .subscribe(data => {
        this.toastr.success('Profilodat módosítottad!', 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.gotoList();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(err)
      }
    );
  }

  gotoList() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    this.editProfile();
  }


  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };
  changeImage = false;
  preFilePath = 'https://s3.us-east-2.amazonaws.com/onlinehealthcaresystem/';

  deletePicture() {
    this.uploadService.deleteFileFromStorage(this.username, this.picture).subscribe(res => {
      this.picture = null;
    });
  }

  uploadPicture() {
    this.progress.percentage = 0;
    const currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorageMine(this.username, currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
    });
    this.picture =  this.updateProfile.patient.picture;
    this.toastr.success('Profilodat módosítottad!', 'OK', {
      timeOut: 3000,  positionClass: 'toast-top-center',
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
