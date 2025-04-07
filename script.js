let memoryView = document.getElementById("memoryView");
let addressCounter = 1000;
let dynamicArray = [];

function reset() {
    memoryView.innerHTML = "";
    document.getElementById("staticControls").style.display = "none";
    document.getElementById("dynamicControls").style.display = "none";
    document.getElementById("stackLabel").style.display = "none";
    document.getElementById("heapLabel").style.display = "none";
    addressCounter = 1000;
    dynamicArray = [];
}


function showStatic() {
    reset();
    document.getElementById("staticControls").style.display = "block";
    document.getElementById("stackLabel").style.display = "inline-block";
}


function createStatic() {
    memoryView.innerHTML = "";
    let input = document.getElementById("staticInput").value;
    let values = input.split(",").map(Number).slice(0, 5);

    values.forEach((val, i) => {
        setTimeout(() => {
            createCell(val, addressCounter, "static");
            addressCounter += 4;
        }, i * 500);
    });

    setTimeout(() => {
        releaseMemory("static");
    }, values.length * 500 + 1500);
}


function promptDynamic() {
    reset();
    document.getElementById("dynamicControls").style.display = "block";
    document.getElementById("heapLabel").style.display = "inline-block";
}


function createDynamic() {
    memoryView.innerHTML = "";
    dynamicArray = [];
    let size = parseInt(document.getElementById("dynSize").value);

    for (let i = 0; i < size; i++) {
        let value = (i + 1) * 10;
        createCell(value, addressCounter, "dynamic");
        dynamicArray.push({ val: value, addr: addressCounter });
        addressCounter += 4;
    }
}


function resizeDynamic() {
    if (dynamicArray.length === 0) {
        alert("⚠️ Cannot resize. No memory allocated!");
        return;
    }

    let newSize = parseInt(document.getElementById("newSize").value);
    if (isNaN(newSize) || newSize <= 0) {
        alert("⚠️ Please enter a valid new size.");
        return;
    }

    let resized = [];

    for (let i = 0; i < newSize; i++) {
        if (i < dynamicArray.length) {
            resized.push({ val: dynamicArray[i].val, addr: addressCounter });
        } else {
            resized.push({ val: 0, addr: addressCounter });
        }
        addressCounter += 4;
    }

    dynamicArray = resized;
    memoryView.innerHTML = "";
    for (let cell of dynamicArray) {
        createCell(cell.val, cell.addr, "dynamic");
    }
}



function createCell(value, address, type = "") {
    let div = document.createElement("div");
    div.className = "memory-cell";
    if (type) div.classList.add(type);
    div.innerHTML = `${value}<div class="address">↳ @ ${address}</div>`;
    memoryView.appendChild(div);
}


function releaseMemory(type) {
    const cells = document.querySelectorAll('.memory-cell');

    cells.forEach((cell, i) => {
        if (!type || cell.classList.contains(type)) {
            setTimeout(() => {
                cell.classList.add("freed");
            }, i * 300);
        }
    });
}


function freeMemory() {
    releaseMemory("dynamic");
}

