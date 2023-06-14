import { take } from 'rxjs/operators';
import { Component, OnInit, SecurityContext, } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { HighlightsService, HighlightsData } from 'src/app/services/highlights/highlights.service';
import { Teams, TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import * as moment from 'moment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';



@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {
  urlLink: any;

  highlights: any 
  constructor(
    public loadingService: LoadingService,
    private toaster: ToastrService,
    protected teamService: TeamService,
    private funcService: FunctionsService,
    public highlightsService: HighlightsService,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fetchHighlights();
    
  }

  fetchHighlights(){
      this.loadingService.quickLoader().then(()=>{
        this.highlightsService.getHighlights().then((snapshots: any) => {
          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          this.highlights = this.organizeData(snapshots_data);
          console.log(this.highlights)
        }).catch(() => {
          this.toaster.quickToast({ msg: "No match standings yet found yet." });
        }).finally(()=> {
          this.loadingService.clearLoader()
        })
      })
  }

  fetchTeam(id: string) {
    return new Promise((resolve) => {
      this.teamService.getTeam(id).pipe(take(1)).subscribe((data: any) => resolve(data));
    })
  }


  organizeData(highlights: HighlightsData[]) {
    let data = highlights.map((highlight: any) => {
      this.fetchTeam(highlight.team).then((team_data) => {
        highlight.team_data = team_data;
      });

      highlight.date = moment(highlight.created).calendar();
      return highlight;
    });

    return data;
  }

  highlightParser(url: any){
   let regExp =   /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);

    return (match&&match[7].length==11)? "https://www.youtube.com/embed/"+match[7] : null;
  }

  // transformUrl(url: SafeResourceUrl){
  //   return this.domSanitizer.bypassSecurityTrustResourceUrl(
  
  //     // console.log(this.highlightParser(url))
  //   );
   
  // }

}
