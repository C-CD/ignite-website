import { CoachesService } from './../../services/coaches/coaches.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FlutterwaveService } from 'src/app/services/flutterwave/flutterwave.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { VotingService } from 'src/app/services/votings/voting.service';
import { take } from 'rxjs/operators';
import { FunctionsService } from 'src/app/services/functions/functions.service';
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
  @Input() category: string = 'players';
  usr: any;
  formDataGroup!: FormGroup;
  voteConfig: VoteConfig = {
    points: 5,
    amount: 50
  };
  error: string | boolean = false;
  success: boolean = false;
  loading: boolean = false;
  coachVote: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private toaster: ToastrService,
    private loadingService: LoadingService,
    private fwService: FlutterwaveService,
    public firebaseAuth: FirebaseAuthService,
    private votingService: VotingService,
    private coachesService: CoachesService,
    private funcService: FunctionsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.validateFormData();

  }

  toggleCoachVote(){
    this.coachVote = (this.coachVote) ? false : true;
    this.cdr.detectChanges();
  }

  setVoteConfig(formData: any) {
    this.voteConfig.points = formData.votes * 5;
    this.voteConfig.amount = formData.votes * 50;
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      coach_id: new FormControl(
        null
      ),
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

  async fetchCoachID(cid: string|null): Promise<string|null> {
    let coach_snapId = null;
    if(cid){
      let snapShots = await this.coachesService.collection().where("cid", "==", cid).get();
      let coaches = this.funcService.handleSnapshot(snapShots);
      console.log(coaches, snapShots);
      coach_snapId = (coaches) ? coaches[0].snap_id : null;
    }

    return coach_snapId;
  }

  async authPayment(formData: any) {
    this.paymentLoading(true);

    const generatedRef = this.fwService.generateReference();
    let coach_snapId: string|null = null;
    // check valid coach id
    if(formData.coach_id) {
      coach_snapId = await this.fetchCoachID(formData.coach_id);
      if (!coach_snapId) return this.paymentFailed("Invalid Coach ID for voting, try again");
    }
    // initialize payment
    initFwCheckout(formData, {
      amount: 50 * formData.votes,
      reference: `${this.category}-voting-${generatedRef}`
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
              votee: this.player.snap_id,
              coach: coach_snapId,
              date: moment().format()
            }).then(() => {
              this.paymentSuccess();
            }).catch((error) => {
              console.log(error);
              this.paymentLoading(false);
              this.paymentFailed();
             });
          } else {
            this.paymentLoading(false);
            this.paymentFailed();
          }
        }).catch((error) => {
          console.log(error);
          this.paymentLoading(false);
          this.paymentFailed();
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
    }, 10000);
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
