// deno run --allow-env --allow-net _data/eventbrite.js

const API_KEY = Deno.env.get("API_KEY");
const EVENT_ID = Deno.env.get("EVENT_ID");

export const metrics = API_KEY ? await getData() : {
  tickets: 333,
  by_type: {},
};

async function getData() {
  const result = await get(`/events/${EVENT_ID}/attendees/`);
  const by_type = {};

  result.attendees.forEach((user) => {
    const type = user.ticket_class_name;

    if (type in by_type) {
      ++by_type[type];
    } else {
      by_type[type] = 1;
    }
  })
  
  return {
    tickets: result.pagination.object_count,
    by_type,
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
