import { render, screen } from '@testing-library/react'
import Canvas from '@/components/canvas/Canvas'

const block = {
  id: 'b1',
  spaceId: 's1',
  createdById: 'u1',
  type: 'TEXT',
  title: 'Hello',
  data: { content: 'Text', style: 'P' },
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  status: 'NORMAL',
  cluster: null,
  zIndex: 0,
  locked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('Canvas', () => {
  it('renders blocks', () => {
    render(<Canvas space={{ id: 's1', name: 'S', description: null, createdAt: new Date(), updatedAt: new Date() }} initialBlocks={[block] as any} userId="u1" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})



