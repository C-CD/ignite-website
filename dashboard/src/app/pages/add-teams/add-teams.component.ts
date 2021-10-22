import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.scss']
})
export class AddTeamsComponent implements OnInit {

  formDataGroup!: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public firebaseAuth: FirebaseAuthService,
    public loadingService: LoadingService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.validateFormData();
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      year: new FormControl(
        moment().format("Y"),
        Validators.compose([
          Validators.required,
          Validators.min(1900),
          Validators.max(2099)
        ])
      ),
    });
  }

  addTeam(formData:any){

  }
}
