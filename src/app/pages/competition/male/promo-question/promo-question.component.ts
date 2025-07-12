import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { HelpserviceService } from 'src/app/services/helpservice/helpservice.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { Answer, PromoQuestionService } from 'src/app/services/promo-question/promo-question.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-promo-question',
  templateUrl: './promo-question.component.html',
  styleUrls: ['./promo-question.component.css']
})
export class PromoQuestionComponent implements OnInit {

  formDataGroup!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingService: LoadingService,
    public promoService: PromoQuestionService,
    private funcService: FunctionsService,
    private helpService: HelpserviceService,
    private toaster: ToastrService,    
  ) { }
 
  ngOnInit(): void {
    this.validateFormData();
  }
  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: new FormControl('', Validators.compose([Validators.required])
      ),
      lastName: new FormControl('', Validators.compose([Validators.required])
      ),
      phone: new FormControl(
        '', Validators.compose([Validators.required,])
      ),
      content: ['', [Validators.required]]
    });
  }

  submitAnswer(formData: any) {
    if (!this.formDataGroup.valid) return;

    const now = moment().format();
    const answer: Answer = {
      question: 'In the game between Ignite Soccer Stars and FC Bethel Sporting-U17, how many goals were scored?',
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      content: formData.content,
      created: now,
      updated: now
    };

    this.loadingService.quickLoader().then(() => {
      this.promoService.addAnswer(answer)
        .then(() => {
          this.toaster.quickToast({ msg: "Answer Submitted successfully." });
          this.formDataGroup.reset();
        })
        .catch(err => {
          console.error(err);
          this.toaster.quickToast({ msg: 'Something went wrong. Please try again.' });
        })
        .finally(() => {
          this.loadingService.clearLoader();
        });
    });
  }
}
