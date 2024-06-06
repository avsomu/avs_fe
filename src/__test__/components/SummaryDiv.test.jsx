
import React ,{act} from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureMockStore from 'redux-mock-store';
import SummaryDiv from "@/components/SummaryDiv/SummaryDiv";
import { Provider } from 'react-redux';
import { idgDataMock } from "@/utility/idgmockData";
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

    const handleEditData = jest.fn(() => { });
    test('Summary Component render', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <SummaryDiv data={idgDataMock} isEdit={false} handleEditData={handleEditData} id='000001' />
            </Provider>
        );

        waitFor(() => {
            expect(getByTestId("title-id")).toBeInTheDocument()
        })

    });

    test('Summary Component tooltip click', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <SummaryDiv data={idgDataMock} isEdit={false} handleEditData={handleEditData} id='000001' />
            </Provider>
        );
        act(() => {
            fireEvent.click(getByTestId("tool-tip-Evidence of decline"));
        })
        waitFor(() => {
            fireEvent.click(getByTestId("close-btn"));
        })
    });

    test('Summary Component edit scenerio', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <SummaryDiv data={idgDataMock} isEdit={true} handleEditData={jest.fn()} id='000001' />
            </Provider>
        );
        waitFor(() => {
            fireEvent.change(getByTestId("change-Evidence of decline"), { target: { value: "1" } });
        })
    });

});
