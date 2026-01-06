import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './page'

describe('Home (TODO App)', () => {
  it('初期表示時にタイトルが表示される', () => {
    render(<Home />)
    expect(screen.getByText('TODOリスト')).toBeInTheDocument()
  })

  it('初期表示時に空のメッセージが表示される', () => {
    render(<Home />)
    expect(screen.getByText('タスクがありません。新しいタスクを追加してください。')).toBeInTheDocument()
  })

  it('初期表示時の統計が正しい', () => {
    render(<Home />)
    const statItems = screen.getAllByText(/未完了:|完了:/)
    expect(statItems).toHaveLength(2)

    const strongElements = screen.getAllByText('0')
    expect(strongElements.length).toBeGreaterThanOrEqual(2)
  })

  it('新しいTODOを追加できる', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    const addButton = screen.getByText('追加')

    await user.type(input, 'テストタスク')
    await user.click(addButton)

    expect(screen.getByText('テストタスク')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('空白のTODOは追加できない', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const addButton = screen.getByText('追加')
    await user.click(addButton)

    expect(screen.getByText('タスクがありません。新しいタスクを追加してください。')).toBeInTheDocument()
  })

  it('Enterキーで新しいTODOを追加できる', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')

    await user.type(input, 'Enterキーテスト')
    await user.keyboard('{Enter}')

    expect(screen.getByText('Enterキーテスト')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('TODOを完了状態に切り替えられる', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, '完了テスト')
    await user.keyboard('{Enter}')

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('TODOを削除できる', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, '削除テスト')
    await user.keyboard('{Enter}')

    expect(screen.getByText('削除テスト')).toBeInTheDocument()

    const deleteButton = screen.getByText('削除')
    await user.click(deleteButton)

    expect(screen.queryByText('削除テスト')).not.toBeInTheDocument()
    expect(screen.getByText('タスクがありません。新しいタスクを追加してください。')).toBeInTheDocument()
  })

  it('複数のTODOを追加できる', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')

    await user.type(input, 'タスク1')
    await user.keyboard('{Enter}')

    await user.type(input, 'タスク2')
    await user.keyboard('{Enter}')

    await user.type(input, 'タスク3')
    await user.keyboard('{Enter}')

    expect(screen.getByText('タスク1')).toBeInTheDocument()
    expect(screen.getByText('タスク2')).toBeInTheDocument()
    expect(screen.getByText('タスク3')).toBeInTheDocument()
  })

  it('統計が正しく更新される', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')

    await user.type(input, 'タスク1')
    await user.keyboard('{Enter}')

    await user.type(input, 'タスク2')
    await user.keyboard('{Enter}')

    const allStrong = screen.getAllByText('2')
    expect(allStrong.length).toBeGreaterThan(0)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    const oneElements = screen.getAllByText('1')
    expect(oneElements.length).toBeGreaterThan(0)
  })

  it('完了したTODOにcompletedクラスが適用される', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'スタイルテスト')
    await user.keyboard('{Enter}')

    const todoText = screen.getByText('スタイルテスト')
    const todoItem = todoText.closest('li')

    expect(todoItem?.className).not.toContain('completed')

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(todoItem?.className).toContain('completed')
  })
})
