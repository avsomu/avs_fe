import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import IdgComponent from '@/components/IdgComponent/IdgComponent';
import { useRouter } from 'next/navigation';

const mockStore = configureMockStore([]);

jest.mock("../../utility/globals.js");
jest.mock('next-auth/react')
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        redirect: jest.fn(),
        back: jest.fn()
    })),
    usePathname: jest.fn()
}));

jest.mock("../../utility/idgmockData", () => ({
    idgDataMock: jest.fn()
}))



describe('IdgComponent', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                ssoAuthenticated: true, // Assuming authenticated for the tests
            },
            patient: {
                patientName: "Mark Steven"
            }
        });
    });


    // const clipboard = { writeText: jest.fn().mockResolvedValue(true) };
    // beforeEach(() => { Object.defineProperty(global.navigator, 'clipboard', { value: clipboard, writable: true }); });


    test('renders IDGComponent properly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <IdgComponent />
            </Provider>
        );
        expect(getByText('IDG Summary')).toBeInTheDocument();
    });

    test('Transfer button click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <IdgComponent />
            </Provider>
        );
        const setIsModalName = jest.fn();
        const setIsModal = jest.fn();
        const setIsEdit = jest.fn();
        waitFor(() => {
            const button = getByTestId('copyBtn');
            fireEvent.click(button);
            expect(setIsModalName).toHaveBeenCalledWith('Transfer');
            expect(setIsModal).toHaveBeenCalledWith(true);
            expect(setIsEdit).toHaveBeenCalledWith(false);
        })
    });

    test('Back button click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <IdgComponent />
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(getByTestId('back-btn'));
            expect(useRouter().back).toHaveBeenCalled();
        })

    });

    test('Edit button click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <IdgComponent />
            </Provider>
        );
        const setIsEdit = jest.fn();
        waitFor(() => {
            const button = getByTestId('editBtn');
            fireEvent.click(button);
            expect(setIsEdit).toHaveBeenCalledWith(true);
        })
    });



    test('Save Consent click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <IdgComponent />
            </Provider>
        );
        const setIsEdit = jest.fn();
        const setIsModal = jest.fn();
        const setIsModalName = jest.fn();
        const setIsSuccess = jest.fn();
        const setEditCopyBtn = jest.fn();

        waitFor(() => {
            const buttonEdit = getByTestId('editBtn');
            fireEvent.click(buttonEdit);
            expect(setEditCopyBtn).toHaveBeenCalledWith(true);
            expect(setIsEdit).toHaveBeenCalledWith(false);
            expect(setIsModal).toHaveBeenCalledWith(true);
            expect(setIsModalName).toHaveBeenCalledWith("Save");
        });

        waitFor(() => {
            const button = getByTestId('save-btn');
            fireEvent.click(button);
            expect(setIsSuccess).toHaveBeenCalledWith(true);
        })

    })

    test('Cancel Icon click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <IdgComponent />
            </Provider>
        );
        const setIsEdit = jest.fn();
        const setIsModal = jest.fn();
        const setIsModalName = jest.fn();
        const setEditCopyBtn = jest.fn();
        const setIsError = jest.fn();
        const setIsSuccess = jest.fn();
        const setIsConsentIcon = jest.fn();
        const setIsDisable = jest.fn();

        waitFor(() => {
            const buttonEdit = getByTestId('editBtn');
            fireEvent.click(buttonEdit);
            expect(setEditCopyBtn).toHaveBeenCalledWith(true);
            expect(setIsEdit).toHaveBeenCalledWith(false);
            expect(setIsModal).toHaveBeenCalledWith(true);
            expect(setIsModalName).toHaveBeenCalledWith("Save");
        });

        waitFor(() => {
            const button = getByTestId('cancel-btn-transfer');
            fireEvent.click(button);
            expect(setIsSuccess).toHaveBeenCalledWith(false)
            expect(setIsError).toHaveBeenCalledWith(false);
            expect(setIsModal).toHaveBeenCalledWith(false);
            expect(setIsConsentIcon).toHaveBeenCalledWith(false);
            expect(setIsDisable).toHaveBeenCalledWith(true)
        })

    })
});

// test('transferText function copies formatted data to clipboard', async () => {

//     const tmpVital = [...idgsummaryVital];
//     const patientBio = {
//         "persons_age": "Patient's Age",
//         "gender": "Gender",
//         "benefit_period": "Benefit Period",
//         "diagnosis": "Person's Primary Diagnosis",
//     }
//     const editText = JSON.parse(JSON.stringify(idgDataMock));
//     const index = 0;

//     // Call the function
//     const result = await transferText();

//     // Assert that the function returns true since the clipboard was successfully written
//     expect(result).toBe(true);

//     // Also assert that navigator.clipboard.writeText was called with the correct arguments
//     //expect(navigator.clipboard.writeText).toHaveBeenCalledWith(/* pass the expected formatted data here */);
// });







