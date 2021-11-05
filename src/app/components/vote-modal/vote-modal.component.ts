import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FlutterwaveService } from 'src/app/services/flutterwave/flutterwave.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
declare let initFwCheckout: any;
@Component({
  selector: 'app-vote-modal',
  templateUrl: './vote-modal.component.html',
  styleUrls: ['./vote-modal.component.css']
})
export class VoteModalComponent implements OnInit {

  @Input() player: any;
  usr:any;
  formDataGroup!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private toaster: ToastrService,
    private loadingService: LoadingService,
    private fwService: FlutterwaveService,
    public firebaseAuth: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
    this.validateFormData();
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      votes: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  authPayment(formData:any){
    const generatedRef = this.fwService.generateReference();

    initFwCheckout(formData, {
      amount: 50 * formData.votes,
      reference: `player-voting-${generatedRef}`
    }).then((transaction: any) => {
      // check transaction status
      if (transaction.status === 'successful') {

      }
    });
  }

}
