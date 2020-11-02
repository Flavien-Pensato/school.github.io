const fetcher = (url, options) =>
  fetch(url, options)
    .then((res) => res.json())
    .catch((res) => res.json());

export default fetcher;
