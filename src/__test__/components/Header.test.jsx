
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureMockStore from 'redux-mock-store';
import Header from "@/components/Header/Header";
import { Provider } from 'react-redux';
import { navigate } from "@/app/actions";
const mockStore = configureMockStore([]);
jest.mock("../../app/actions");
jest.mock('next-auth/react')

describe("Header", () => {
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
    test('Header Component render', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(getByTestId('header_icon')).toBeInTheDocument();
        expect(getByTestId('profile_icon')).toBeInTheDocument();
        expect(getByTestId('profile_name')).toBeInTheDocument();
    });

    test('Header Component Profile Icon click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header onClick={jest.fn()} />
            </Provider>
        );
        waitFor(() => {
            const setIsHidden = jest.fn();
            expect(getByTestId('profile_icon')).toBeInTheDocument()
            fireEvent.click(getByTestId('profile_icon'));
            expect(setIsHidden).toHaveBeenCalledWith(true)
        })

    });
    test('Header Component logout click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        waitFor(() => {
            const setIsHidden = jest.fn();
            fireEvent.click(getByTestId('logout-btn'));
            expect(setIsHidden).toHaveBeenCalledWith(false)
        })
    });

    test('test home button in header', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        fireEvent.click(getByTestId('homeBtn'));
        expect(navigate).toHaveBeenCalledWith("/patient-lists")
    });

});
