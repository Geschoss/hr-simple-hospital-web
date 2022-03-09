export type Patient = {
  id: string;
  fullName: string;
  sex: 'man' | 'woman';
  bithday: string;
  address: string;
  OMS: string;
  archived: boolean;
};
