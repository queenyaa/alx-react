import React from 'react';
import { render } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow Component', () => {
    it('renders one cell with colspan = 2 when textSecondCell does not exist', () => {
        const { getByText } = render(
            <table>
                <tbody>
                    <CourseListRow isHeader={true} textFirstCell="Header Cell" />
                </tbody>
            </table>
        );

        const headerCell = getByText('Header Cell');
        expect(headerCell.colSpan).toBe(2);
    });

    it('renders two cells when textSecondCell is present', () => {
        const { getByText } = render(
            <table>
                <tbody>
                    <CourseListRow
                        isHeader={true}
                        textFirstCell="First Header Cell"
                        textSecondCell="Second Header Cell"
                    />
                </tbody>
            </table>
        );

        expect(getByText('First Header Cell')).toBeInTheDocument();
        expect(getByText('Second Header Cell')).toBeInTheDocument();
    });

    it('renders correctly two td elements within a tr element', () => {
        const { getByText } = render(
            <table>
                <tbody>
                    <CourseListRow
                        isHeader={false}
                        textFirstCell="First Data Cell"
                        textSecondCell="Second Data Cell"
                    />
                </tbody>
            </table>
        );

        expect(getByText('First Data Cell')).toBeInTheDocument();
        expect(getByText('Second Data Cell')).toBeInTheDocument();
    });
});