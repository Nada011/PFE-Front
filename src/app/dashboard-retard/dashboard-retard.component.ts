import { ZXingHtml5QrcodeDecoder } from './../../zxing-html5-qrcode-decoder';
import { environment } from './../../environments/environment';
import { Retard } from './../Entities/retard';

import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Vol } from '../Entities/vol';
import { RetardService } from '../Services/retard.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Html5QrcodeScanner } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { Html5Qrcode } from 'html5-qrcode/esm/html5-qrcode';
import { Html5QrcodeScanType } from 'html5-qrcode/esm/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-retard',
  templateUrl: './dashboard-retard.component.html',
  styleUrls: ['./dashboard-retard.component.css'],
})
export class DashboardRetardComponent implements OnInit {
  public Retards: any[];
  public Retard: any;
  passager: any;
  filtredbon: any;
  bons: any[];
  filterText: String = '';
  FiltredRetard: any[];
  Vol: String = '';
  date: String = '';
  Origine: String = '';
  Destination: String = '';
  retard: any;
  constructor(private RetardService: RetardService, private router: Router) {}
  /////
  html5QrcodeScanner: any;
  qrCodeScanner: any;
  scannedCode: any;
  contrat: any;
  v: string;
  startScanner() {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: 250,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );
    this.html5QrcodeScanner.render(this.onScanSuccess, undefined);
  }

  public onScanSuccess(decodedText: any) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`);
    let input = document.getElementById('inputScan');

    input?.setAttribute('value', decodedText);
  }
  //set filter
  setFilter(vol: String, origine: String, destination: String, date: String) {
    this.Vol = vol;
    this.Origine = origine;
    (this.date = date), console.log(date);
    this.Destination = destination;
    console.log(
      'test',
      this.filterRetard(vol, origine, destination, this.date)
    );
    this.FiltredRetard = this.filterRetard(
      vol,
      origine,
      destination,
      this.date
    );
  }
  ///filter
  filterRetard(
    vol: String,
    origine: String,
    destination: String,
    date: String
  ) {
    let result: unknown;
    if (
      this.Retards.length === 0 ||
      (this.Vol === '' &&
        this.Origine === '' &&
        this.Destination === '' &&
        this.date === '')
    ) {
      return this.Retards;
    } else {
      return this.Retards.filter((Retard) => {
        if (vol != '') {
          result = Retard.vl.toLowerCase().match(vol.toLowerCase());
        }
        if (origine != '') {
          result = Retard.origine.toLowerCase().match(origine.toLowerCase());
        }
        if (destination != '') {
          result = Retard.destination
            .toLowerCase()
            .match(destination.toLowerCase());
        }
        if (date != '') {
          result = formatDate(Retard.date_VOL, 'yyyy-dd-MM', 'en')
            .toLowerCase()
            .match(date.toLowerCase());
        }
        return result;
      });
    }
  }
  //set filter text
  setFilterText(value: String) {
    this.filterText = value;
    console.log(value);
    this.filtredbon = this.filter(value);
  }
  ///filter
  filter(code: String) {
    return this.bons.filter((bon) => {
      let d = bon.idPassger.toString() + this.Retard.vl;
      if (this.html5QrcodeScanner != null) {
        this.html5QrcodeScanner.clear();
      }
      if (d === code && bon.valide == true) {
        return this.redirectTo(this.Retard, bon);
      }
      if (d === code && bon.valide == false) {
        return d === code;
      }
    });
  }

  /////
  ngOnInit() {
    this.getAllRetards();
  }

  // GET Retard
  public getAllRetards(): void {
    this.RetardService.getAllRetards().subscribe(
      (response: Retard[]) => {
        this.Retards = response;
        this.FiltredRetard = this.Retards;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public redirectTo(retard: any, passager: any) {
    sessionStorage.setItem('bon', JSON.stringify(passager));

    sessionStorage.setItem('retard', JSON.stringify(retard));
    const button = document.getElementById('Quitter');
    button?.click();
    this.router.navigate(['/bonPrestation', {}]);
  }
  public onOpenModal(Retard: any, mode: string): void {
    const conatainer = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'bon') {
      this.Retard = Retard;
      this.bons = Retard.bonsPrestation;
      button.setAttribute('data-target', '#bon');
    }

    conatainer?.appendChild(button);
    button.click();
  }
}
