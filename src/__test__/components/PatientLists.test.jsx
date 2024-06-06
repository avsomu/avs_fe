import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import PatientListComponent from '@/components/PatientListComponent/PatientListComponent';

const mockStore = configureMockStore([]);
jest.mock("../../utility/globals")
jest.mock('next-auth/react')
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        redirect: jest.fn(),
    })),
    usePathname: jest.fn()
}));
jest.mock("../../app/actions")
describe('PatientListComponent', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                ssoAuthenticated: true, // Assuming authenticated for the tests
            },
        });
    });

    test('renders PatientListComponent properly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <PatientListComponent data={[]} />
            </Provider>
        );
        // Check if "Lists of Patients" text is rendered
        expect(getByText('Lists of Patients')).toBeInTheDocument();
    });

    test('Navigating to PDP page button click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PatientListComponent data={[]} />
            </Provider>
        );
        waitFor(() => {
            fireEvent.click(getByTestId('pdp-John Doe'))
        });
    });
    test('Navigating to IDG Summary page button click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PatientListComponent data={[]} />
            </Provider>
        );
        waitFor(() => {
            fireEvent.click(getByTestId('idg-Routine-John Doe'))
        });
    });
});