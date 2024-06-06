
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureMockStore from 'redux-mock-store';
import ToolTipComponent from "@/components/Tooltip/ToolTipComponent";
import { Provider } from 'react-redux';
import { tooltipIndData } from "@/utility/queryPatientmockData";
import Footer from "@/components/Footer/Footer";
const mockStore = configureMockStore([]);


describe("SummarDiv", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            login: {
                ssoAuthenticated: true,
            },
            patient: {
                patientName: "Mark Steven"
            }
        });
    });

    const handleClose = jest.fn(() => { });
    test('ToolTip Component render', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <ToolTipComponent label='Evidence of decline' vitalVisit={tooltipIndData} handleClose={handleClose} id='000001' />
            </Provider>
        );
        waitFor(() => {
            expect(getByTestId("selected-tooltip-Evidence of decline")).toBeInTheDocument()
        })

    });

    test('ToolTip Component close btn', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <ToolTipComponent label='Evidence of decline' vitalVisit={tooltipIndData} handleClose={handleClose} id='000001' />
            </Provider>
        );
        waitFor(() => {
            const setTooltipIndex = jest.fn();
            fireEvent.click(getByTestId("close-btn"));
            expect(setTooltipIndex).toHaveBeenCalledWith(null)
        })

    });

});
