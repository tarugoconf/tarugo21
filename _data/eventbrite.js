// deno run --allow-env --allow-net _data/eventbrite.js

const API_KEY = Deno.env.get("API_KEY");
const EVENT_ID = Deno.env.get("EVENT_ID");

export const metrics = API_KEY ? await getData() : {
  tickets: 333,
};

async function getData() {
  const result = await get(`/events/${EVENT_ID}/attendees/`);

  return {
    tickets: result.pagination.object_count,
  };
}

async function get(path) {
  const url = `https://www.eventbriteapi.com/v3${path}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
    },
  });

  const result = await response.json();

  if (result.error) {
    console.error(result);
    Deno.exit(1);
  }

  return result;
}
