import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public aesForm !: FormGroup;
  public key = 'DF3F4DA9A8BC712C'
  public cipherText = ""
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.initializeUserForm()
  }
  title = 'aes-encryption';

  initializeUserForm(){
    this.aesForm = this.fb.group({
      plaintext: [''],
      types:['ENCRYPTION']
    });
  }
  encrypt() {
    let formData = this.aesForm.value
    console.log(formData)
    if (formData.types == 'ENCRYPTION') { 
      var key = CryptoJS.enc.Utf8.parse(this.key);
      var iv = CryptoJS.enc.Utf8.parse(this.key) 
      var encrypted = CryptoJS.AES.encrypt(formData.plaintext.trim(), key, { iv: iv, mode: CryptoJS.mode.CBC});
      console.log(encrypted.toString())
      this.cipherText =  encrypted.toString();
    }  
    if(formData.types == 'DECRYPTION') {  
      var iv = CryptoJS.enc.Utf8.parse(this.key);
      var key1 = CryptoJS.enc.Utf8.parse(this.key);
      var decrypted =  CryptoJS.AES.decrypt(formData.plaintext, key1, { iv: iv, mode: CryptoJS.mode.CBC});
      console.log(decrypted.toString(CryptoJS.enc.Utf8))
      this.cipherText= decrypted.toString(CryptoJS.enc.Utf8);
  }
  }
}







