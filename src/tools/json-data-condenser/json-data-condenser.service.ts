export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function getKeySignature(obj: Record<string, any>): string {
  // Create a normalized signature string of sorted keys
  return Object.keys(obj).sort().join(',');
}

export function condenseJsonStructures(data: JsonValue): JsonValue {
  // Handle primitive values
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    const seenSignatures = new Set<string>();
    const result: JsonValue[] = [];

    for (const item of data) {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const signature = getKeySignature(item as Record<string, JsonValue>);
        if (!seenSignatures.has(signature)) {
          seenSignatures.add(signature);
          result.push(condenseJsonStructures(item));
        }
      }
      else {
        result.push(condenseJsonStructures(item));
      }
    }

    return result;
  }

  // Handle plain objects
  const result: Record<string, JsonValue> = {};
  for (const key in data) {
    result[key] = condenseJsonStructures(data[key]);
  }
  return result;
}
