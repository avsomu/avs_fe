import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { PatientDetailComponent } from '@/components/PatientDetailComponent/PatientDetailComponent';
import { navigate } from '@/app/actions';


const mockStore = configureMockStore([]);

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        redirect: jest.fn(),
    }),
    usePathname: jest.fn(),
}));

jest.mock('../../app/actions');
jest.mock('next-auth/react')

describe('PatientListComponent', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                ssoAuthenticated: true, // Assuming authenticated for the tests
            },
            patient: {
                patientName: 'Mark Steven'
            }
        });
    });

    test('renders PatientListComponent properly', () => {
        const dataRes = {
            vital: {}, vists: []
        }
        const { getByText } = render(
            <Provider store={store}>
                <PatientDetailComponent data={dataRes} patientId={'000001'} />
            </Provider>
        );
        // Check if "Lists of Patients" text is rendered
        expect(getByText('Patient Details')).toBeInTheDocument();
    });

    test('Navigate to the Patient Lists from Patient Detail', () => {
        const dataRes = {
            vital: {}, vists: []
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <PatientDetailComponent data={dataRes} patientId={'000001'} />
            </Provider>
        );
        fireEvent.click(getByTestId('back-btn'));
        expect(navigate).toHaveBeenCalledWith('/patient-lists');
    });
    test('Navigate to the Idg Summary from Patient Detail', () => {
        const dataRes = {
            vital: {}, vists: []
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <PatientDetailComponent data={dataRes} patientId={'000001'} />
            </Provider>
        );
        fireEvent.click(getByTestId('idgBtn'));
        expect(navigate).toHaveBeenCalledWith('/idg-summary/summary?id=000001');
    });
});