import { Patient } from 'domains';

export const Patients = () => {
  return (
    <>
      <Patient.UI.Search />
      <Patient.UI.List />
    </>
  );
};
