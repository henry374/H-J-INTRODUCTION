let pledges = JSON.parse(localStorage.getItem('pledges')) || [];

function addPledge() {
    let name = document.getElementById('pName').value;
    let amount = document.getElementById('pAmount').value;
    let status = document.getElementById('pStatus').value;

    if(name == "" || amount == "") {
        alert("Please fill name and amount");
        return;
    }

    pledges.push({name: name, amount: Number(amount), status: status});
    localStorage.setItem('pledges', JSON.stringify(pledges));
    
    document.getElementById('pName').value = "";
    document.getElementById('pAmount').value = "";
    
    showPledges();
}

function showPledges() {
    let table = document.getElementById('pledgeTable');
    let total = 0;
    let paid = 0;
    table.innerHTML = "";

    pledges.forEach((p, index) => {
        total += p.amount;
        if(p.status == "Paid") paid += p.amount;
        
        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.amount.toLocaleString()} UGX</td>
                <td><span class="badge ${p.status}">${p.status}</span></td>
                <td><button onclick="removePledge(${index})" class="del">X</button></td>
            </tr>
        `;
    });

    document.getElementById('total').innerText = total.toLocaleString() + " UGX";
    document.getElementById('paid').innerText = paid.toLocaleString() + " UGX";
    document.getElementById('balance').innerText = (total - paid).toLocaleString() + " UGX";
}

function removePledge(index) {
    if(confirm("Delete this pledge?")) {
        pledges.splice(index, 1);
        localStorage.setItem('pledges', JSON.stringify(pledges));
        showPledges();
    }
}

// Load on start
showPledges();