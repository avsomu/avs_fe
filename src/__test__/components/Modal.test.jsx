import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Modal from '@/components/Modal/Modal';
const mockStore = configureMockStore([]);


describe('Modal Component', () => {
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
    test('Handle Consent Transfer ModalBox', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Modal isModal={true} setIsModal={jest.fn()} modalName={'Transfer'} onSave={jest.fn()} onConsentOk={jest.fn()}
                    onCancel={jest.fn()} handleTransfer={jest.fn()} />
            </Provider>
        );

        const setIsConsentIcon = jest.fn();
        const setIsDisable = jest.fn()
        waitFor(() => {
            fireEvent.click(getByTestId('handle-consent'));
            expect(setIsModalName).toHaveBeenCalledWith('Transfer');
            expect(setIsConsentIcon).toHaveBeenCalledWith(true);
            expect(setIsDisable).toHaveBeenCalledWith(false);
        })
    });

    test('Handle cancel button in ModalBox', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Modal isModal={true} setIsModal={jest.fn()} modalName={'Transfer'} onSave={jest.fn()} onConsentOk={jest.fn()}
                    onCancel={jest.fn()} handleTransfer={jest.fn()} />
            </Provider>
        );

        const setIsConsentIcon = jest.fn();
        const setIsDisable = jest.fn();
        const setIsSuccess = jest.fn();
        const setIsError = jest.fn();
        const setIsModal = jest.fn()
        const onCancel = jest.fn()
        waitFor(() => {
            fireEvent.click(getByTestId('cancel-btn-transfer'));
            expect(setIsConsentIcon).toHaveBeenCalledWith(false);
            expect(setIsDisable).toHaveBeenCalledWith(true);
            expect(setIsModal).toHaveBeenCalledWith(false);
            expect(setIsError).toHaveBeenCalledWith(false);
            expect(setIsSuccess).toHaveBeenCalledWith(false);
            expect(onCancel).toHaveBeenCalled()
        })
    });

    test('Handle Save button in ModalBox', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Modal isModal={true} setIsModal={jest.fn()} modalName={'Save'} onSave={jest.fn()} onConsentOk={jest.fn()}
                    onCancel={jest.fn()} handleTransfer={jest.fn()} />
            </Provider>
        );
        const setIsSuccess = jest.fn();
        const onSave = jest.fn();
        waitFor(() => {
            fireEvent.click(getByTestId('save-btn'));
            expect(setIsSuccess).toHaveBeenCalledWith(false);
            expect(onSave).toHaveBeenCalled()
        })
    });

    test('Handle OK button in ModalBox', async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Modal isModal={true} setIsModal={jest.fn()} modalName={'Save'} onSave={jest.fn()} onConsentOk={jest.fn()}
                    onCancel={jest.fn()} handleTransfer={jest.fn(() => true)} />
            </Provider>
        );
        const setIsSuccess = jest.fn();
        const onConsentOk = jest.fn();
        const setIsModal = jest.fn();
        const setIsError = jest.fn()
        waitFor(() => {
            fireEvent.click(getByTestId('ok-btn'));
            expect(setIsSuccess).toHaveBeenCalledWith(false);
            expect(setIsSuccess).toHaveBeenCalledWith(false)
            expect(setIsError).toHaveBeenCalledWith(false);
            expect(setIsModal).toHaveBeenCalledWith(false)
            expect(onConsentOk).toHaveBeenCalledWith(btn)
        })
    });
});