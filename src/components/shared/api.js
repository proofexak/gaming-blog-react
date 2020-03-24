const csrfToken = () => {
  const csrf = document.getElementsByName('csrf-token')[0];

  if (csrf) {
    return csrf.content;
  }
  return '';
};

const ApiURL = 'https://lyse-api.herokuapp.com';

export const makePutRequest = data => fetch(`${ApiURL}${data.url}`, {
  body: JSON.stringify(data.body),
  method: 'PUT',
  headers: {
    'X-CSRF-Token': csrfToken(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authorization_token')}`,
  },
  credentials: 'same-origin',
}).then((response) => {
  if (response.statusText === 'No Content') {
    return { data: {}, status: response.status };
  }
  return response.json().then((responseData) => {
    if (response.status >= 400 && response.status < 500) {
      return Promise.reject(responseData);
    }
    return {
      data: responseData,
    };
  });
});

export const makePostRequest = params => fetch(`${ApiURL}${params.url}`, {
  body: JSON.stringify(params.body),
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authorization_token')}`,
  },
  credentials: 'same-origin',
}).then(response => (
  response.json().then((data) => {
    if (response.status >= 400 && response.status < 500) {
      return Promise.reject(data);
    }
    return {
      data,
    };
  })
));

export const makeGetRequest = data => fetch(`${ApiURL}${data.url}`, {
  headers: {
    'X-CSRF-Token': csrfToken(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authorization_token')}`,
  },
  credentials: 'same-origin',
}).then(response => response.json().then(responseData => ({
  data: responseData,
  status: response.status,
}))).catch(() => {
  alert('There was an error trying to get data');
});

export const makeDeleteRequest = data => fetch(`${ApiURL}${data.url}`, {
  method: 'DELETE',
  headers: {
    'X-CSRF-Token': csrfToken(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authorization_token')}`,
  },
  credentials: 'same-origin',
});

export const logoutAdmin = () => fetch(`${ApiURL}/admins/sign_out`, {
  method: 'DELETE',
  headers: {
    'X-CSRF-Token': csrfToken(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authorization_token')}`
  },
  credentials: 'same-origin',
});

export const loginAdmin = (data) => fetch(`${ApiURL}/admins/sign_in`, {
  body: JSON.stringify(data.body),
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
}).then(response => (
  response.json().then((data) => {
    if (response.status >= 400 && response.status < 500) {
      return Promise.reject(data.error);
    }
    return {
      data,
    };
  })
));
