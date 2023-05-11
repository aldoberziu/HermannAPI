const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 1500);
};
const login = async (email, password, passwordSecret) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:1000/api/v1/admin/login',
      data: {
        email: email,
        password: password,
        passwordSecret: passwordSecret,
      },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/admin-dashboard');
      }, 300);
    }
  } catch (err) {
    if (err.response.statusText === 'Unauthorized') {
      showAlert('error', 'Incorrect inputs!');
    }
  }
};
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:1000/api/v1/admin/logout',
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 100);
      //reload(true) => forces reload from the server
      //reload() => reload from the browser cache
      // location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
const deleteDoc = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:1000/${endpoint}/:id`,
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Deleted successfully!');
      // window.setTimeout(() => {
      //   location.assign('/admin-dashboard');
      // }, 1000);
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error deleting! Try again.');
  }
};
const updateDoc = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:1000/njoftime/:id`,
      data,
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Updated successfully!');
      // window.setTimeout(() => {
      //   location.assign('/admin-dashboard');
      // }, 1000);
      location.reload(true);
    }
  } catch (err) {
    // console.log(err.stack);
    console.log(err.response.data);
    showAlert('error', err.message);
  }
};

const loginForm = document.querySelector('.login');
const deleteBtn = document.querySelector('.delete-doc');
const updateForm = document.querySelector('.update-form');
const logOutBtn = document.getElementsByClassName('.logout');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordSecret = document.getElementById('passwordSecret').value;
    login(email, password, passwordSecret);
  });
}
if (deleteBtn) {
  deleteBtn.addEventListener('click', deleteDoc);
}
if (updateForm) {
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', document.getElementById('title').value)
    form.append('description', document.getElementById('description').value)
    // form.append('images', document.getElementById('images').files);
    updateDoc(form);
  })
}

// if (logOutBtn) {
//   logOutBtn.addEventListener('click', logout);
// }