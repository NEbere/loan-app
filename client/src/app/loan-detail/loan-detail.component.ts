import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// local iimports
import { APIUtilService } from '../../services/apiUtils';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

  currencySymbol = '€'
  loanEntries = []
  loan:any = {}

  public loading: boolean
  public loadingPrices: boolean
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: APIUtilService
  ) { }

  ngOnInit() {
    this.getLoan();
  }

  getLoan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true
    this.apiService.getLoan(id)
    .subscribe(data => {
      this.loan = data.loan
      this.loading = false
    })
  }

  deleteLoan(loan: any): void {
    const loanId = loan.id
    this.apiService.deleteLoan(loanId)
    .subscribe(() => {
      console.log("Loan deleted successfully")
      this.router.navigate(['']);
    })
  }

  addLoanNote(loan: any): void {
    console.log(loan, "add loan note")
  }

}
