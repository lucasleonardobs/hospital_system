export function checkAlphaInput(event: any) {
  var value = String.fromCharCode(event.which);
  var pattern = new RegExp(/[a-zA-Z\u00C0-\u00FF ]+/i);
  return pattern.test(value);
}
