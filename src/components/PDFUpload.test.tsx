import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { PDFUpload } from './PDFUpload';

// Mock the PdfViewer component as it's not the focus of this test.
vi.mock('./PdfViewer', () => ({
  PdfViewer: () => <div data-testid="pdf-viewer-mock" />
}));

describe('PDFUpload', () => {
  const onFileSelect = vi.fn();
  const onRemove = vi.fn();
  const mockFile = new File(['(⌐□_□)'], 'chuck-norris.pdf', { type: 'application/pdf' });
  const mockPdfFile = {
    file: mockFile,
    preview: '', // This is not used in the component logic being tested
    name: 'chuck-norris.pdf',
    size: '15 Bytes' // Also not used
  };

  // Mock URL.createObjectURL and URL.revokeObjectURL
  const createObjectURL = vi.fn((file) => `blob:http://localhost:3000/${file.name}`);
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    // Assign mocks to global URL object
    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;
    vi.clearAllMocks();
  });

  it('should open, close, and re-open the PDF preview modal correctly', async () => {
    const user = userEvent.setup();

    // Render the component with a selected file
    render(
      <PDFUpload
        onFileSelect={onFileSelect}
        onRemove={onRemove}
        selectedFile={mockPdfFile}
      />
    );

    // 1. Open the preview modal
    const previewButton = screen.getByTitle('Preview PDF');
    await user.click(previewButton);

    // Assert modal is open and URL was created
    let previewIframe = await screen.findByTitle('PDF Preview');
    expect(previewIframe).toBeInTheDocument();
    expect(previewIframe).toHaveAttribute('src', 'blob:http://localhost:3000/chuck-norris.pdf');
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).not.toHaveBeenCalled();

    // 2. Close the preview modal
    // The close button is the sibling of the h3 with the filename
    const heading = screen.getByRole('heading', { name: /chuck-norris.pdf/i });
    const closeButton = heading.nextElementSibling as HTMLElement;
    await user.click(closeButton);

    // Assert modal is closed and URL was revoked
    expect(screen.queryByTitle('PDF Preview')).not.toBeInTheDocument();
    // The effect cleanup runs, revoking the URL
    expect(revokeObjectURL).toHaveBeenCalledTimes(1);

    // 3. Re-open the preview modal
    await user.click(previewButton);

    // Assert modal is open again and a new URL was created
    previewIframe = await screen.findByTitle('PDF Preview');
    expect(previewIframe).toBeInTheDocument();
    expect(previewIframe).toHaveAttribute('src', 'blob:http://localhost:3000/chuck-norris.pdf');
    expect(createObjectURL).toHaveBeenCalledTimes(2);
    // Revoke from previous close should still be 1
    expect(revokeObjectURL).toHaveBeenCalledTimes(1);

    // 4. Close the modal again to ensure cleanup works on subsequent closes
    const newHeading = screen.getByRole('heading', { name: /chuck-norris.pdf/i });
    const newCloseButton = newHeading.nextElementSibling as HTMLElement;
    await user.click(newCloseButton);

    expect(screen.queryByTitle('PDF Preview')).not.toBeInTheDocument();
    expect(revokeObjectURL).toHaveBeenCalledTimes(2);
  });
});