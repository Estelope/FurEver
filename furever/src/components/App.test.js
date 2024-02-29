import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react'
import Heading from './Heading/Header';
import Footer from './Footer/Footer';
import App from '../App';
import { BrowserRouter, Route } from "react-router-dom";

const MockHome = () => {
  return <BrowserRouter>
    < Heading />
  </BrowserRouter>;
}
test('renders the Heading component', () => {
  render(
    <MockHome />
  );

  const heading = screen.getByAltText('logo');

  expect(heading).toBeInTheDocument()
})

