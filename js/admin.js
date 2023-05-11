function setupTabs() {
  document.querySelectorAll('.sidebarbtn').forEach((button) => {
    button.addEventListener('click', () => {
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(
        `.tabcontent[data-tab="${tabNumber}"]`
      );

      sideBar.querySelectorAll('.sidebarbtn').forEach((button) => {
        button.classList.remove('sidebarbtn--active');
      });

      tabsContainer.querySelectorAll('.tabcontent').forEach((tab) => {
        tab.classList.remove('tabcontent--active');
      });

      button.classList.add('sidebarbtn--active');
      tabToActivate.classList.add('tabcontent--active');
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();

  document.querySelectorAll('.tabs').forEach((tabsContainer) => {
    tabsContainer.querySelector('.sidebarlinks .sidebarbtn').click();
  });
});

function on() {
  document.getElementById('overlay').style.display = 'block';
}

function off() {
  document.getElementById('overlay').style.display = 'none';
}

//overlay adminDashboard
// document.getElementById('btnoverlay').addEventListener('click', function(){
//   document.querySelector('#overlay').style.display = 'flex';
// });
// document.getElementById('closebtn').addEventListener('click', function(){
//   document.querySelector('#overlay').style.display = 'none';
// });
// function showPreview(event){
//   if(event.target.files.length > 0){
//     var src = URL.createObjectURL(event.target.files[0]);
//     var preview = document.getElementById("file-ip-1-preview");
//     preview.src = src;
//     preview.style.display = "block";
//   }
// }