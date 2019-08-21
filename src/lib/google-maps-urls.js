export function makeAerialMapUrl(center, zoom) {
  let params = {
    endpoint: "staticmap",
    size: `640x640`,
    center,
    zoom,
    maptype: "satellite",
    scale: 2
  };

  let queryString = Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

  return `/api/google-maps-proxy?${queryString}`;
}

export function makeStreetViewUrl(location, pano, fov, heading, pitch) {
  let params = {
    endpoint: "streetview",
    size: `640x640`,
    fov,
    heading,
    pitch
  };

  if (pano !== undefined) {
    params = { pano, ...params };
  } else {
    params = { location, ...params };
  }

  let queryString = Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

  return `/api/google-maps-proxy?${queryString}`;
}
