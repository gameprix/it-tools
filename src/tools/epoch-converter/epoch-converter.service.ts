// Convert Epoch to Human Readable Date
export function epochToDate(epoch: string | number): string {
  const num = typeof epoch === 'string' ? Number.parseInt(epoch, 10) : epoch;

  if (Number.isNaN(num)) {
    throw new TypeError('Invalid epoch timestamp');
  }

  const timestamp = num < 1e12 ? num * 1000 : num;

  return new Date(timestamp).toLocaleString();
}

// Convert Human Readable Date to Epoch
export function dateToEpoch(dateString: string): number {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Invalid date string');
  }

  return Math.floor(date.getTime() / 1000);
}
