import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { PlayersApplicationService } from 'src/app/services/players-application/players-application.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { UploadService } from 'src/app/services/uploads/upload.service';
import { ModalData, SuccessModalComponent } from '../success-modal/success-modal.component';
import { StatusModalsComponent, SuccessDialogData } from './status-modals/status-modals.component';

declare let bootstrap: any;


@Component({
  selector: 'app-player-registeration',
  templateUrl: './player-registeration.component.html',
  styleUrls: ['./player-registeration.component.css']
})
export class PlayerRegisterationComponent implements OnInit {

  @ViewChild(SuccessModalComponent, { static: true }) modalChild!: SuccessModalComponent;
  @Input() gender: string = 'male';
  uploads: { identification: any, cert: any } = { identification: null, cert: null };
  formDataGroup!: FormGroup;
  successData!: ModalData;
  modalData: any;

  constructor(
    public formBuilder: FormBuilder,
    private toaster: ToastrService,
    public loadingService: LoadingService,
    public firebaseAuth: FirebaseAuthService,
    private playerRegService: PlayersApplicationService,
    public funcService: FunctionsService,
    private uploadService: UploadService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // const directData = {
    //   title: "Registration Successful",
    //   body: "Thanks your registration form has been submitted successfully, you will be contacted with instructions on the next steps.",
    //   success: true
    // };
    // this.openModal(directData);
    this.validateFormData();
  }


  form(control: string) {
    return this.formDataGroup.controls[control];
  }

  openModal(data: SuccessDialogData) {
    let dialogRef = this.dialog.open(StatusModalsComponent, { panelClass: 'full-width-dialog', data: data});

    dialogRef.afterClosed().subscribe((data) => {
      window.location.reload();
    });
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      surname: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      middle_name: new FormControl(''),
      dob: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl(this.gender, Validators.compose([Validators.required])),
      state_of_origin: new FormControl('', Validators.compose([Validators.required])),
      home_address: new FormControl('', Validators.compose([Validators.required])),
      state: new FormControl('', Validators.compose([Validators.required])),
      lga: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      edu_level: new FormControl('', Validators.compose([Validators.required])),
      school_name: new FormControl('', Validators.compose([Validators.required])),
      school_cert_file: new FormControl('', Validators.compose([Validators.required])),
      school_address: new FormControl('', Validators.compose([Validators.required])),
      sport_interested: new FormControl('', Validators.compose([Validators.required])),
      sport_position: new FormControl('', Validators.compose([Validators.required])),
      health_challenge: new FormControl('No', Validators.compose([Validators.required])),
      health_challenge_desc: new FormControl(''),
      current_play: new FormControl('No', Validators.compose([Validators.required])),
      current_team: new FormControl(''),
      guardian_surname: new FormControl('', Validators.compose([Validators.required])),
      guardian_fname: new FormControl('', Validators.compose([Validators.required])),
      guardian_relationship: new FormControl('', Validators.compose([Validators.required])),
      guardian_address: new FormControl('', Validators.compose([Validators.required])),
      guardian_email: new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      guardian_phone: new FormControl('', Validators.compose([Validators.required])),
      identification_type: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      identification_file: new FormControl('', Validators.compose([Validators.required])),
      consent_terms: new FormControl('', Validators.compose([Validators.required])),
      consent_guardian: new FormControl('', Validators.compose([Validators.required])),
      consent_ccd: new FormControl('', Validators.compose([Validators.required])),
      year: new FormControl(moment().format('YYYY')),
    });
  }

  register(formData: any) {
    // return console.log(formData);
    this.formDataGroup.disable();
    this.loadingService.quickLoader().then(() => {
      this.uploadFiles(formData).then((formData) => {
        // console.log(formData);
        this.playerRegService.addPlayersRegistration({
          surname: formData.surname,
          first_name: formData.first_name,
          middle_name: '',
          dob: formData.dob,
          gender: formData.gender,
          state_of_origin: formData.state_of_origin,
          home_address: formData.home_address,
          state: formData.state,
          lga: formData.lga,
          city: formData.city,
          edu_level: formData.edu_level,
          school_name: formData.school_name,
          school_cert_file: formData.school_cert_file,
          school_address: formData.school_address,
          sport_interested: formData.sport_interested,
          sport_position: formData.sport_position,
          health_challenge: formData.health_challenge,
          health_challenge_desc: formData.health_challenge_desc,
          current_play: formData.current_play,
          current_team: formData.current_team,
          guardian_surname: formData.guardian_surname,
          guardian_fname: formData.guardian_fname,
          guardian_relationship: formData.guardian_relationship,
          guardian_address: formData.guardian_address,
          guardian_email: formData.guardian_email,
          guardian_phone: formData.guardian_phone,
          identification_type: formData.identification_type,
          identification_number: formData.identification_number,
          identification_file: formData.identification_file,
          consent_terms: formData.consent_terms,
          consent_guardian: formData.consent_guardian,
          consent_ccd: formData.consent_ccd,
          year: formData.year,
          updated: moment().format(),
          created: moment().format()
        }).then(() => {
          this.toaster.quickToast({ msg: "Player Registration Successful", cat: "success" });
          const directData = {
            title: "Registration Successful",
            body: "Thanks your registration form has been submitted successfully, you will be contacted with instructions on the next steps.",
            success: true
          };
          this.openModal(directData);
          this.funcService.resetReactiveForm(this.formDataGroup);
        }).catch(() => {
          // this.toaster.quickToast({ msg: "Error registering player", cat: "danger" });
          const directData = {
            title: "Registration Failed",
            body: "Error registering your information kindly try again.",
            success: false
          };
          this.openModal(directData);
        }).finally(() => {
          this.formDataGroup.enable();
          this.loadingService.clearLoader();
        })
      }).catch((error) => {
        console.log(error);
        this.toaster.quickToast({ msg: "Player Registration Failed", cat: "danger" });
      });
    });
  }

  setFile(event: any, sub: 'identification' | 'cert') {
    this.uploads[sub] = event.target.files;
  }

  async uploadFiles(formData: any) {
    try {
      if (formData.identification_file.length && this.uploads && this.uploads.identification) {
        const identification_file: any = await this.uploadService.startFileUpload(this.uploads.identification, 'playerIdentificationImage', 0, 'file');
        if (identification_file) formData.identification_file = identification_file.filepath;
      }

      if (formData.school_cert_file.length && this.uploads && this.uploads.cert) {
        const school_cert_file: any = await this.uploadService.startFileUpload(this.uploads.cert, 'schoolCertificateImage', 0, 'file');
        if (school_cert_file) formData.school_cert_file = school_cert_file.filepath;
      }
    }
    catch (error) {
      console.log(error);
      this.toaster.globalErrorToast();
    };

    return formData;
  }
}
