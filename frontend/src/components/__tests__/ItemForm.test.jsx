import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemForm from '../ItemForm';

describe('ItemForm', () => {
  it('renders form fields', () => {
    const onSubmit = vi.fn();
    render(<ItemForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create item/i })).toBeInTheDocument();
  });

  it('validates required title field', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ItemForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: /create item/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ItemForm onSubmit={onSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /create item/i });

    await user.type(titleInput, 'Test Item');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Test Item',
        description: 'Test Description',
      });
    });
  });

  it('shows update button when editing', () => {
    const onSubmit = vi.fn();
    const initialData = {
      _id: '123',
      title: 'Existing Item',
      description: 'Existing Description',
    };

    render(<ItemForm onSubmit={onSubmit} initialData={initialData} />);

    expect(screen.getByRole('button', { name: /update item/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Item')).toBeInTheDocument();
  });
});

