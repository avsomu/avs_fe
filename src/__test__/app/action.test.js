import { navigate } from '@/app/actions'; // Import the navigate function
import { redirect } from 'next/navigation'; // Import the redirect function

jest.mock('next/navigation', () => ({
    redirect: jest.fn() // Mock the redirect function
}));

test('navigate function redirects to the correct URL', async () => {
    const redirectUrl = '/patient-lists';

    // Call the navigate function
    await navigate(redirectUrl);

    // Assert that the redirect function was called with the correct URL
    expect(redirect).toHaveBeenCalledWith(redirectUrl);
});