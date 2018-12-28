import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  note:any = {}

  public loading: boolean
  public loadingPrices: boolean
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: APIUtilService,
    private modalService: NgbModal
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

    // Modal code
    openEditModal(Editcontent) {
      this.modalService.open(Editcontent, {ariaLabelledBy: 'edit-loan-modal'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'create-note-modal'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  addLoanNote(loanId: any, note: any): void {
    const loanData = {loanId, note}
    this.apiService.addLoanNote(loanData)
    .subscribe(() => {
      window.location.reload();
    })
  }

  editLoan(loan: any) : void {
    this.apiService.editLoan(loan)
    .subscribe(data => {
      console.log(data, "Loan edited")
      window.location.reload();
    })
  }

}
