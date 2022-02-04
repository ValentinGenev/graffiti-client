import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Board from '../components/Board'

test('renders the graffiti board', () => {
    render(<Board />)
    const header = screen.getByText('graffiti')
    expect(header).toBeInTheDocument()
})
