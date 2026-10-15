let pledges = JSON.parse(localStorage.getItem('hj_pledges') || '[]');
let total = 0;

function addPledge(){
  const name = document.getElementById('nameInput').value.trim();
  const amount = parseInt(document.getElementById('amountInput').value);
  const message = document.getElementById('messageInput').value.trim();
  
  if(!name || !amount){
    alert('Please enter name and amount');
    return;
  }
  
  pledges.push({name, amount, message, date: new Date().toLocaleDateString()});
  localStorage.setItem('hj_pledges', JSON.stringify(pledges));
  
  document.getElementById('nameInput').value = '';
  document.getElementById('amountInput').value = '';
  document.getElementById('messageInput').value = '';
  
  renderPledges();
}

function renderPledges(){
  const list = document.getElementById('pledgeList');
  const totalEl = document.getElementById('totalAmount');
  const whatsappBtn = document.getElementById('whatsappBtn');
  
  list.innerHTML = '';
  total = 0;
  
  pledges.forEach(p => {
    total += p.amount;
    const div = document.createElement('div');
    div.className = 'pledge-item';
    div.innerHTML = `<span>${p.name} ${p.message ? '- ' + p.message : ''}</span><span>UGX ${p.amount.toLocaleString()}</span>`;
    list.appendChild(div);
  });
  
  totalEl.textContent = `UGX ${total.toLocaleString()}`;
  
  // WHATSAPP FIX - PUT YOUR NUMBER HERE
  const yourNumber = '256700000000'; // <-- CHANGE THIS to your WhatsApp number! Example: 256771234567
  const text = `Hello Henry & Joan! I have pledged UGX ${total.toLocaleString()} for H&J Introduction on 6th Dec. Total pledges list: ${pledges.map(p=>p.name+': '+p.amount).join(', ')}. Blessings!`;
  const whatsappLink = `https://wa.me/${yourNumber}?text=${encodeURIComponent(text)}`;
  
  whatsappBtn.href = whatsappLink;
  whatsappBtn.textContent = total > 0 ? `Confirm UGX ${total.toLocaleString()} via WhatsApp →` : 'Add pledge first, then WhatsApp';
}

renderPledges();
