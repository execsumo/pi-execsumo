let calm = false;
let stockExportRendering = false;

export function setCalmPresentation(active: boolean): void {
  calm = active;
}

export function setCalmStockExportRendering(active: boolean): void {
  stockExportRendering = active;
}

export function calmPresentationIsActive(): boolean {
  return calm;
}

// All callers ask whether Calm should hide a non-final presentation row. The
// final user prompt and assistant response are rendered by Pi directly and do
// not use this helper.
export function calmPresentationHides(): boolean {
  return calm && !stockExportRendering;
}
