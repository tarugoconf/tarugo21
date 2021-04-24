// deno run --allow-env --allow-net _data/_eventbrite.js
// https://www.eventbrite.com/platform/docs/authentication
const apiKey = Deno.env.get("API_KEY");
const eventId = Deno.env.get("EVENT_ID");

const result = await get(`/events/${eventId}/attendees/`);

console.log(result);

async function get(path) {
  const url = `https://www.eventbriteapi.com/v3${path}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  const result = await response.json();

  if (result.error) {
    console.error(result);
    Deno.exit(1);
  }

  return result;
}
