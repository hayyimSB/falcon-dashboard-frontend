export type CautionModal = { [k: string]: CautionModalType };

interface CautionModalType {
  title?: string;
  mainText?: string;
  btnText: string;
  iconColor: string;
  iconBackground: (t: any) => string;
  buttonColor: string;
  hoverColor: string;
}

export type TabListType = { [k: string]: DropdownType[] };

export interface DropdownType {
  label: string;
  value: string | number;
}
