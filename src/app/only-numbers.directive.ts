import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[AcceptOnlyNumbers]',
})
export class AcceptOnlyNumbers {
  constructor(private el: ElementRef) {}

  @Input() AcceptOnlyNumbers: boolean;

  @HostListener('keypress', ['$event'])
  onInput(event: any) {
    debugger;
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(
      event.which ? event.which : event.keyCode
    );

    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let dataToPaste = event.clipboardData.getData('text');
    const regex = new RegExp(/^[\0-9]+$/);
    if (regex.test(dataToPaste)) {
      return dataToPaste;
    } else {
      event.preventDefault();
    }
  }
}

// https://www.youtube.com/watch?v=6fKwMKtDyCc&list=PLcfD4HARQRF_ayBPwt4IF6jrFZOcnPAYG&index=17
