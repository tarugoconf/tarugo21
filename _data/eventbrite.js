const API_KEY = Deno.env.get("API_KEY");
const EVENT_ID = Deno.env.get("EVENT_ID");

const filteredTypes = ["VIP"];

const day = 24 * 60 * 60 * 1000;
const now = new Date();
const future = new Date(2021, 9, 21);

export const days_left = Math.round(Math.abs((now - future) / day));

export const metrics = API_KEY ? await getData() : {
  tickets: 333,
  by_type: {},
};

async function getData() {
  const result = await get(`/events/${EVENT_ID}/attendees/`);
  const by_type = {};
  let tickets = 0;

  result.attendees.forEach((user) => {
    const type = user.ticket_class_name;

    if (filteredTypes.includes(type)) {
      return;
    }
    ++tickets;

    if (type in by_type) {
      ++by_type[type];
    } else {
      by_type[type] = 1;
    }
  })

  tickets = pagination.object_count;
  
  return {
    tickets,
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
