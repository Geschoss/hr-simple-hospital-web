import { createStore, createEffect } from 'shared/lib';
import { Patient } from '../types';

export const patients = createStore<Patient[]>([]);
export const fetchPatients = createEffect(
  '/patient/list',
  patients,
  ({ payload }) => payload
);
