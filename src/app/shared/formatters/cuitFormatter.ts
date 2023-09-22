export function cuitFormatter(value: string | undefined, spacer: string = ' - ') {
  value = String(value);
  return (
    value.slice(0, 2) + spacer + value.slice(2, 10) + spacer + value.slice(10)
  );
}
