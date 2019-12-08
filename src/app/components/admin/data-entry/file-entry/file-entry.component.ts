import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DataService } from 'src/app/services';
import { Router } from '@angular/router';
import { DEFAULT_ADMIN_ROUTE } from 'src/app/Utility';

@Component({
  selector: 'app-file-entry',
  templateUrl: './file-entry.component.html',
  styleUrls: ['./file-entry.component.scss']
})
export class FileEntryComponent implements OnInit {

  accept = '.xls,.xlsx';
  displayedColumns: string[] = [
    'Topic', 'Question', 'Description', 'Answer', 'OptionA', 'OptionB', 'OptionC', 'OptionD', 'Score'
  ];
  XLSX_JSON = [];
  // tslint:disable-next-line: variable-name
  Refined_XLSX_JSON = [];

  constructor(
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClick() {
    const fileUpload = document.getElementById('file-data-entry-file-upload') as HTMLInputElement;
    fileUpload.onchange = (ev) => {
      this.onFileChange(ev);
    };
    fileUpload.click();
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataKeys = Object.keys(jsonData);
      const XLSX_JSON = [];
      for (const key of dataKeys) {
        if (jsonData[key].length > 0) {
          XLSX_JSON.push(...jsonData[key]);
        }
      }
      this.XLSX_JSON = JSON.parse(JSON.stringify(XLSX_JSON));
      console.log(this.XLSX_JSON);
      this.Refined_XLSX_JSON = this.data.dataEntry(this.XLSX_JSON);
    };
    reader.readAsBinaryString(file);
  }

  onSubmit() {
    console.log(this.Refined_XLSX_JSON);
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}questions-list`]);
  }

  onBack() {
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}data-entry`]);
  }

}
