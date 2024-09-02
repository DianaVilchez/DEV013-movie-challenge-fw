import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom'
import { userEvent } from '@testing-library/user-event'

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/testpath.jpg',
  release_date: '2023-01-01',
  genres: ['Action', 'Animation', 'Drama'],
  genre_ids: [1,16,3]
};
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));
const useNavigateMock = jest.mocked(useNavigate)


describe("MovieCard", () => {
  test("renders correctly with all props", async () => {
  
  render(<MovieCard {...mockMovie}/>)

  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  expect(screen.getByText('Action, Drama')).toBeInTheDocument();
  })

  test("handles navigation on click", async () => {
    const navigateMock = jest.fn()

  useNavigateMock.mockReturnValue(navigateMock)

  render(<MovieCard {...mockMovie}/>)

  const movieCardElement = screen.getByText('Test Movie').closest('section'); // Encuentra el contenedor más cercano
  await userEvent.click(movieCardElement!);

  expect(navigateMock).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  })
})
