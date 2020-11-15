const fetcher = (...props) =>
  fetch(...props).then(async (res) => {
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    throw data.error;
  });

export default fetcher;
