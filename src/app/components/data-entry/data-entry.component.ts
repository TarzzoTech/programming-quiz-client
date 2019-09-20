import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LanguageStructure } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  constructor(
    private data: DataService,
    private api: ApiService
  ) { }

  ngOnInit() {
    // this.data.onEditQuestion.next('_snivh3mqzmg95drc8oq33n');
    this.api.getLanguagesCollection().then((languagesCollection: LanguageStructure[]) => {
      this.data.setLanguagesCollection(languagesCollection);
    });
  }

}
