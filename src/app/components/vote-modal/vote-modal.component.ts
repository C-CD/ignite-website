import { CoachesService } from './../../services/coaches/coaches.service';
import { ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FlutterwaveService } from 'src/app/services/flutterwave/flutterwave.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { VotingService } from 'src/app/services/votings/voting.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { PayResolutionService } from 'src/app/services/pay-resolution/pay-resolution.service';
import { Clipboard } from '@angular/cdk/clipboard';
import * as $ from 'jquery';
import { ClipboardService } from 'ngx-clipboard';

declare let initFwCheckout: any;
declare let bootstrap: any;

// @ViewChild('closeModal') closeModal: ElementRef

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
  @Input() public onSuccess: () => void = () => {};


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
  fwSuccess: any = null;

  constructor(
    public formBuilder: FormBuilder,
    private toaster: ToastrService,
    private loadingService: LoadingService,
    private fwService: FlutterwaveService,
    public firebaseAuth: FirebaseAuthService,
    private votingService: VotingService,
    private coachesService: CoachesService,
    private funcService: FunctionsService,
    private cdr: ChangeDetectorRef,
    private payResolver: PayResolutionService,
    private clipboard: Clipboard,
    private _clipboardService: ClipboardService
  ) {

  }

  ngOnInit(): void {
    this.onSuccess();
    this.validateFormData();
  }

  closeModal() {
    // $('#votingModal').toggleClass("show").css('display', 'none');
    var myModalEl = document.getElementById('votingModal');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

  toggleCoachVote() {
    this.coachVote = (this.coachVote) ? false : true;
    this.cdr.detectChanges();
    if (this.coachVote) {
      this.formDataGroup.controls.votes.disable();
      this.formDataGroup.controls.votes.setValue(1);
      this.voteConfig = {
        points: 5,
        amount: 50
      }
    } else {
      this.formDataGroup.controls.votes.enable();
    }
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
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  async fetchCoachID(cid: string | null): Promise<string | null> {
    let coach_snapId = null;
    if (cid) {
      let snapShots = await this.coachesService.collection().where("cid", "==", cid).get();
      let coaches = this.funcService.handleSnapshot(snapShots);
      console.log(coaches, snapShots);
      coach_snapId = (coaches) ? coaches[0].snap_id : null;
    }

    return coach_snapId;
  }

  async hasCoachVotedPlayer(coach: string, player: string) {
    const snapShots = await this.votingService.collection()
      .where("coach", "==", coach)
      .where("votee", "==", player).get();
    const votes = this.funcService.handleSnapshot(snapShots);
    console.log(votes);
    return (votes) ? true : false;
  }

  async authPayment(formData: any) {
    this.paymentLoading(true);
    const generatedRef = this.fwService.generateReference();

    let coach_snapId: string | null = null;
    // check valid coach id
    if (this.coachVote && formData.coach_id) {
      coach_snapId = await this.fetchCoachID(formData.coach_id);
      if (!coach_snapId) {
        return this.paymentFailed("Invalid Coach ID for voting, try again");
      } else {
        const coachesVotes = await this.hasCoachVotedPlayer(coach_snapId, this.player.snap_id)
        if (coachesVotes) return this.paymentFailed("You can only vote once for this player.");
      }
    }
    // initialize payment
    if (!coach_snapId) {
      this.initPurchaseVote(formData, generatedRef);
    } else {
      this.initCoachVotePlayer(formData, generatedRef, coach_snapId);
    }
  }

  initPurchaseVote(formData: any, ref: string) {
    const voteData = {
      amount: 50 * formData.votes,
      reference: `${this.category}-voting-${ref}`
    };
    // init flutterwave
    initFwCheckout(formData, voteData, {
      ...voteData,
      ...formData,
      voteConfig: this.voteConfig
    }).then((transaction: any) => {
      // console.log(transaction);
      // check transaction status
      if ((['successful', 'completed']).includes(transaction.status)) {
        this.fwSuccess = transaction;
        this.fwService.verifyTransaction(transaction).then((response: any) => {
          if (response.data && response.data.status === 'successful') {
            this.votingService.addVote({
              quantity: formData.votes,
              points: this.voteConfig.points,
              amount: transaction.amount,
              ref: transaction.tx_ref,
              meta_data: response.data,
              votee: this.player.snap_id,
              coach: null,
              date: moment().format('YYYY-MM-DD hh:mm:ss')
            }).then(() => {
              console.log("Payment Successful");
              this.paymentSuccess();
              this.closeModal();
            }).catch((error) => {
              console.log(error);
              this.paymentLoading(false);
              this.paymentFailed(false, this.fwSuccess);
            });
          } else {
            this.paymentLoading(false);
            this.paymentFailed(false, transaction);
          }
        }).catch((error) => {
          console.log(error);
          this.paymentLoading(false);
          this.paymentFailed(false, transaction);
        })
      } else {
        this.paymentLoading(false);
        this.paymentFailed(false, transaction);
      }
    }).catch((error: any) => {
      // console.log(error);
      // this.paymentLoading(false);
      this.paymentFailed();
    })
  }

  initCoachVotePlayer(formData: any, reference: string, coach: string) {
    this.votingService.addVote({
      quantity: 1,
      points: this.voteConfig.points,
      amount: 0,
      ref: `coaches-voting-${reference}`,
      meta_data: null,
      votee: this.player.snap_id,
      coach: coach,
      date: moment().format()
    }).then(() => {
      this.paymentSuccess();
    }).catch((error) => {
      console.log(error);
      this.paymentLoading(false);
      this.paymentFailed();
    });
  }

  paymentLoading(status = true) {
    setTimeout(() => {
      this.error = false;
      this.loading = status;
      this.success = false;
    }, (status) ? 0 : 5000);
  }

  paymentSuccess() {
    this.error = false;
    this.loading = false;
    this.success = true;
    this.onSuccess();
    setTimeout(() => {
      this.success = false;
    }, 13000);
  }

  paymentFailed(msg: any = false, fw: any = null) {
    this.loading = false;
    this.success = false;
    this.error = (msg) ? msg : "Oop's payment failed.. try again!";
    if (fw) {
      this.payResolver.addPayResolution({
        meta: fw,
        status: 0,
        created: moment().format('YYYY-MM-DD hh:mm:ss'),
        updated: moment().format('YYYY-MM-DD hh:mm:ss')
      })
    }
    // if(!fw){
    //   setTimeout(() => {
    //     this.error = false;
    //   }, 13000);
    // }
  }

  clearInputOnClose() {
    this.coachVote = false;
    this.formDataGroup.controls.votes.enable();
    this.formDataGroup.controls.votes.setValue(1);
    this.formDataGroup.controls.coach_id.setValue(null);
    this.voteConfig = {
      points: 5,
      amount: 50
    }
  }

  closeErrorModal() {
    this.error = false;
  }

  copyToClipboard(item: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      if (e.clipboardData) e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      // @ts-ignore
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    alert("Copied text to clipboard");
  }
}
