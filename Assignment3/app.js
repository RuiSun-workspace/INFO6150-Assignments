const FULL_NAME = 'Rui Sun';
const NUID      = '002500092';

const idBanner  = document.getElementById('idBanner');
const tbody     = document.getElementById('tbody');
const btnAdd    = document.getElementById('btn-add');
const btnSubmit = document.getElementById('btn-submit');

const dlg       = document.getElementById('editDialog');
const dlgTitle  = document.getElementById('dlgTitle');
const dlgInput  = document.getElementById('dlgInput');
const dlgCancel = document.getElementById('dlgCancel');
const dlgOk     = document.getElementById('dlgOk');

document.addEventListener('DOMContentLoaded', () => {
  idBanner.textContent = `Full Name: ${FULL_NAME} | NUID: ${NUID}`;
  for(let i=0;i<3;i++) addRow();
  updateSubmitState();
});

function currentCount(){
  return tbody.querySelectorAll('tr.main').length;
}
function makeArrowButton(){
  const btn = document.createElement('button');
  btn.className = 'toggle';
  btn.type = 'button';
  btn.setAttribute('aria-expanded','false');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 4l8 8-8 8" stroke="#065f46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return btn;
}
function makeMainRow(id){
  const tr = document.createElement('tr');
  tr.className = 'main';
  tr.dataset.id = String(id);

  const tdArrow   = document.createElement('td');
  const tdSelect  = document.createElement('td');
  const tdStudent = document.createElement('td');
  const tdTeacher = document.createElement('td');
  const tdProgram = document.createElement('td');
  const tdDelete  = document.createElement('td');
  const tdEdit    = document.createElement('td');

  tdArrow.appendChild(makeArrowButton());

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  tdSelect.appendChild(cb);

  tdStudent.textContent = `Student ${id}`;
  tdTeacher.textContent = `Teacher ${id}`;
  tdProgram.textContent = `Program ${id}`;

  tr.append(tdArrow, tdSelect, tdStudent, tdTeacher, tdProgram, tdDelete, tdEdit);
  return tr;
}
function makeDetailsRow(id){
  const tr = document.createElement('tr');
  tr.className = 'details';
  tr.hidden = true; 
  const td = document.createElement('td');
  td.colSpan = 7;
  td.className = 'details-cell';
  td.textContent = `Details for Student ${id}`;
  tr.appendChild(td);
  return tr;
}
function addRow(){
  try{
    const id = currentCount() + 1;
    const main = makeMainRow(id);
    const details = makeDetailsRow(id);
    tbody.append(main, details);
    alert(`Student ${id} Record added successfully`);
  }catch(e){
    alert('Add record failed');
  }
}
function renumberAll(){
  const rows = tbody.querySelectorAll('tr.main');
  rows.forEach((row, i) => {
    const id = i + 1;
    row.dataset.id = String(id);
    row.children[2].textContent = `Student ${id}`;
    row.children[3].textContent = `Teacher ${id}`;
    row.children[4].textContent = `Program ${id}`;
    const details = row.nextElementSibling;
    if(details && details.classList.contains('details')){
      details.firstChild.textContent = `Details for Student ${id}`;
    }
  });
}
function updateSubmitState(){
  const anyChecked = !!tbody.querySelector('tr.main input[type="checkbox"]:checked');
  btnSubmit.disabled = !anyChecked;
  btnSubmit.classList.toggle('enabled', anyChecked);
}
function ensureButtons(tr){
  const tdDelete = tr.children[5];
  const tdEdit   = tr.children[6];
  if(!tdDelete.firstChild){
    const b = document.createElement('button');
    b.className = 'btn-delete';
    b.type = 'button';
    b.textContent = 'Delete';
    tdDelete.appendChild(b);
  }
  if(!tdEdit.firstChild){
    const b = document.createElement('button');
    b.className = 'btn-edit';
    b.type = 'button';
    b.textContent = 'Edit';
    tdEdit.appendChild(b);
  }
}
function removeButtons(tr){
  tr.children[5].innerHTML = '';
  tr.children[6].innerHTML = '';
}

btnAdd.addEventListener('click', addRow);

btnSubmit.addEventListener('click', () => {
  const selected = [...tbody.querySelectorAll('tr.main input:checked')]
    .map(cb => cb.closest('tr.main').children[2].textContent);
  alert('Submitting: ' + (selected.join(', ') || ''));
});

tbody.addEventListener('change', (e) => {
  if(e.target.type === 'checkbox'){
    const tr = e.target.closest('tr.main');
    tr.classList.toggle('selected', e.target.checked);
    if(e.target.checked) ensureButtons(tr); else removeButtons(tr);
    updateSubmitState();
  }
});

tbody.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('.toggle');
  if(toggleBtn){
    const main = toggleBtn.closest('tr.main');
    const details = main.nextElementSibling;
    const willOpen = details.hidden;
    details.hidden = !willOpen;
    toggleBtn.setAttribute('aria-expanded', String(willOpen));
    return;
  }

  if(e.target.classList.contains('btn-delete')){
    const main = e.target.closest('tr.main');
    const student = main.children[2].textContent; 
    const details = main.nextElementSibling;
    if(details && details.classList.contains('details')) details.remove();
    main.remove();
    renumberAll();
    updateSubmitState();
    alert(`${student} Record deleted successfully`);
    return;
  }

  if(e.target.classList.contains('btn-edit')){
    const main = e.target.closest('tr.main');
    const id = main.dataset.id;
    dlgTitle.textContent = `Edit details of Student ${id}`;
    dlgInput.value = '';
    dlg.showModal();
    dlgOk.onclick = () => {
      const v = dlgInput.value.trim();
      if(v){
        alert(`Student ${id} data updated successfully`); 
      }
      dlg.close();
    };
    dlgCancel.onclick = () => dlg.close();
  }
});
