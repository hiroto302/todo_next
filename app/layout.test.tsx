import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout from './layout'

describe('RootLayout', () => {
  it('childrenを正しくレンダリングする', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">テストコンテンツ</div>
      </RootLayout>
    )

    const testChild = screen.getByTestId('test-child')
    expect(testChild).toBeInTheDocument()
    expect(testChild).toHaveTextContent('テストコンテンツ')
  })

  it('複数の子要素を正しくレンダリングする', () => {
    render(
      <RootLayout>
        <div data-testid="child-1">子要素1</div>
        <div data-testid="child-2">子要素2</div>
      </RootLayout>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })

  it('テキストコンテンツが正しく表示される', () => {
    render(
      <RootLayout>
        <h1>テストタイトル</h1>
        <p>テスト段落</p>
      </RootLayout>
    )

    expect(screen.getByText('テストタイトル')).toBeInTheDocument()
    expect(screen.getByText('テスト段落')).toBeInTheDocument()
  })
})
