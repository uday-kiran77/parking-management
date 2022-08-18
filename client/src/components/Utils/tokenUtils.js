export function issueExit(id) {}

export function filterToken(id, tokens) {
  var token = tokens.filter((e) => {
    return e.id.includes(id);
  });

  if (token) return token;
  else return tokens;
}
