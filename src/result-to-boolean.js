export default function resultToBoolean(result) {
  return (
    (typeof result === 'object' && Object.keys(result) > 0) ||
    !!result
  );
}
