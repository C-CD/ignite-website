import { VotingService } from './../../services/votings/voting.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FlutterwaveService } from 'src/app/services/flutterwave/flutterwave.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
declare let initFwCheckout: any;

interface VoteConfig {
  points: number,
  amount: number
};


@Component({
  selector: 'app-vote-modal',
  templateUrl: './vote-modal.component.html',
  styleUrls: ['./vote-modal.component.css']
})

export class VoteModalComponent implements OnInit {

  @Input() player: any;
  usr: any;
  formDataGroup!: FormGroup;
  voteConfig: VoteConfig = {
    points: 5,
    amount: 50
  };
  error: string | boolean = false;
  success: boolean = false;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private toaster: ToastrService,
    private loadingService: LoadingService,
    private fwService: FlutterwaveService,
    public firebaseAuth: FirebaseAuthService,
    private votingService: VotingService
  ) { }

  ngOnInit(): void {
    this.validateFormData();

  }

  setVoteConfig(formData: any) {
    this.voteConfig.points = formData.votes * 5;
    this.voteConfig.amount = formData.votes * 50;
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      votes: new FormControl(
        1,
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

  authPayment(formData: any) {
    const generatedRef = this.fwService.generateReference();

    initFwCheckout(formData, {
      amount: 50 * formData.votes,
      reference: `player-voting-${generatedRef}`
    }).then((transaction: any) => {

      // check transaction status
      if (transaction.status === 'successful') {
        this.fwService.verifyTransaction(transaction).then((response: any) => {
          if (response.data && response.data.status === 'successful') {
            this.votingService.addVote({
              quantity: formData.votes,
              points: this.voteConfig.points,
              amount: transaction.amount,
              ref: transaction.tx_ref,
              meta_data: response.data,
              player: this.player.snap_id,
              date: moment().format()
            }).then(() => {
              this.paymentSuccess();
            });
          } else {
            this.paymentLoading(false);
            this.paymentFailed();
          }
        })
      } else {
        this.paymentLoading(false);
        this.paymentFailed();
      }
    }).catch((error:any) => {
      console.log(error);
      this.paymentLoading(false);
      this.paymentFailed();
    })
  }

  paymentLoading(status = true) {
    setTimeout(() => {
      this.error = false;
      this.loading = status;
      this.success = false;
    }, (status) ? 0 : 3000);
  }

  paymentSuccess() {
    this.error = false;
    this.loading = false;
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

  paymentFailed(msg: any = false) {
    this.loading = false;
    this.success = false;
    this.error = (msg) ? msg : "Oop's payment failed.. try again!";
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }

}