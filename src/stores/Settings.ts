import { action, makeObservable, observable } from 'mobx';
import StoresType from './types';
import { AdminInfoType } from '../types/store';

export default class Settings {
  stores: StoresType;
  adminInfo: AdminInfoType = {
    sub: '',
    name: '',
    phone_number: '',
    email: '',
    group: '',
  };
  errorMessage: any = {};
  accessToken: string = '';
  tokenExpiredTime: number;
  btcData: any = [];
  ethData: any = [];
  adaData: any = [];
  bchData: any = [];
  bsvData: any = [];
  dotData: any = [];
  eosData: any = [];
  etcData: any = [];
  filData: any = [];
  linkData: any = [];
  ltcData: any = [];
  trxData: any = [];
  xrpData: any = [];

  constructor(stores: StoresType) {
    makeObservable(this, {
      // Store State
      tokenExpiredTime: observable,
      errorMessage: observable,
      accessToken: observable,
      adminInfo: observable,
      btcData: observable,
      ethData: observable,
      adaData: observable,
      bchData: observable,
      bsvData: observable,
      dotData: observable,
      eosData: observable,
      etcData: observable,
      filData: observable,
      linkData: observable,
      ltcData: observable,
      trxData: observable,
      xrpData: observable,
      // Store Action
      setTokenExpiredTime: action.bound,
      setErrorMessage: action.bound,
      setAccessToken: action.bound,
      setAdminInfo: action.bound,
      setBtcData: action.bound,
      setEthData: action.bound,
      setAdaData: action.bound,
      setBchData: action.bound,
      setBsvData: action.bound,
      setDotData: action.bound,
      setEosData: action.bound,
      setEtcData: action.bound,
      setFilData: action.bound,
      setLinkData: action.bound,
      setLtcData: action.bound,
      setTrxData: action.bound,
      setXrpData: action.bound,
    });
    this.stores = stores;
  }
  setErrorMessage(errorMessage: any) {
    this.errorMessage = errorMessage;
  }
  setAccessToken(token: string) {
    this.accessToken = token;
  }
  setTokenExpiredTime(tokenExpiredTime: number) {
    this.tokenExpiredTime = tokenExpiredTime;
  }
  setAdminInfo(adminInfo: any) {
    this.adminInfo = adminInfo;
  }
  setBchData(data) {
    this.bchData = data;
  }
  setBtcData(data) {
    this.btcData = data;
  }
  setEthData(data) {
    this.ethData = data;
  }
  setAdaData(data) {
    this.adaData = data;
  }
  setBsvData(data) {
    this.bsvData = data;
  }
  setDotData(data) {
    this.dotData = data;
  }
  setEosData(data) {
    this.eosData = data;
  }
  setEtcData(data) {
    this.etcData = data;
  }
  setFilData(data) {
    this.filData = data;
  }
  setLinkData(data) {
    this.linkData = data;
  }
  setLtcData(data) {
    this.ltcData = data;
  }
  setTrxData(data) {
    this.trxData = data;
  }
  setXrpData(data) {
    this.xrpData = data;
  }
  setInit() {
    this.adminInfo = {
      sub: '',
      name: '',
      phone_number: '',
      email: '',
      group: '',
    };
    this.errorMessage = {};
    this.accessToken = '';
    this.tokenExpiredTime = 0;
    this.btcData = [];
    this.ethData = [];
    this.adaData = [];
    this.bchData = [];
    this.bsvData = [];
    this.dotData = [];
    this.eosData = [];
    this.etcData = [];
    this.filData = [];
    this.linkData = [];
    this.ltcData = [];
    this.trxData = [];
    this.xrpData = [];
  }
}
