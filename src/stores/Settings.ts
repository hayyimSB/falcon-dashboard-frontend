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
  constructor(stores: StoresType) {
    makeObservable(this, {
      // Store State
      tokenExpiredTime: observable,
      errorMessage: observable,
      accessToken: observable,
      adminInfo: observable,
      // Store Action
      setTokenExpiredTime: action.bound,
      setErrorMessage: action.bound,
      setAccessToken: action.bound,
      setAdminInfo: action.bound,
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
  }
}
