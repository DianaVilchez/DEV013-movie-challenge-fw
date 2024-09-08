import { render, screen} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import Pagination from '../components/Pagination'
import '@testing-library/jest-dom';


describe('', () => {
    //mockeas la funcion onSelectPage
     const onSelectPage = jest.fn();
        const currentPage = 2;
        const totalPages = 20;

    test('clicking "Next Page" button navigates to the next page', async() => {
        render(
            <Pagination 
            currentPage= {currentPage}
            totalPages= {totalPages}
            onSelectPage={onSelectPage} 
            />
        )
        const nextButton = screen.getByLabelText('Next Page');
        await userEvent.click(nextButton)
        expect(onSelectPage).toHaveBeenCalledWith(currentPage +1);
    })

    test('clicking "Specific Page" button navigates to the page', async() => {
        render(
            <Pagination 
            currentPage= {currentPage}
            totalPages= {totalPages}
            onSelectPage={onSelectPage} 
            />
        )
        const previousButton = screen.getByLabelText('Previous Page');
        await userEvent.click(previousButton)
        expect(onSelectPage).toHaveBeenCalledWith(currentPage - 1);
    })

    test('clicking "Previous Page" button navigates to the previous page', async() => {
        render(
            <Pagination 
            currentPage= {currentPage}
            totalPages= {totalPages}
            onSelectPage={onSelectPage} 
            />
        )
        const specificPage = screen.getByText('5');
        await userEvent.click(specificPage);
        expect(onSelectPage).toHaveBeenCalledWith(5);
    })

    test('Ellipses are displayed when there are pages between start and end', async() => {
        render(
            <Pagination 
            currentPage= {currentPage}
            totalPages= {totalPages}
            onSelectPage={onSelectPage} 
            />
        )
        const ellipsis = screen.getAllByText('...');
        expect(ellipsis.length).toBeGreaterThan(0); 
    })

})