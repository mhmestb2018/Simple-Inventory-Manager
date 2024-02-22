document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('stock-modal');
    var closeBtn = document.getElementsByClassName("close")[0];
        
    window.openStockModal = function() {
        modal.style.display = 'block';
    }

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    var form = document.getElementById('newStockForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var productId = document.getElementById('product-id').value;
        var productName = document.getElementById('product-name').value;
        var category = document.getElementById('product-category').value;
        var brand = document.getElementById('product-brand').value;
        var notes = document.getElementById('product-notes').value;
        var count = document.getElementById('product-count').value;

        var table = document.querySelector('.table');
        var newRow = table.insertRow(-1);

        var checkBoxCell = newRow.insertCell(0);
        var productIdCell = newRow.insertCell(1);
        var productNameCell = newRow.insertCell(2);
        var categoryCell = newRow.insertCell(3);
        var brandCell = newRow.insertCell(4);
        var notesCell = newRow.insertCell(5);
        var countCell = newRow.insertCell(6);
        var statusCell = newRow.insertCell(7);

        checkBoxCell.innerHTML = '<input type="checkbox" class="checker">';
        productIdCell.innerHTML = productId;
        productNameCell.innerHTML = productName;
        categoryCell.innerHTML = category;
        brandCell.innerHTML = brand;
        notesCell.innerHTML = notes;
        countCell.innerHTML = count;

        if(count == 0) {
            statusCell.innerHTML = 'Out of Stock';
        }
        else if (count > 0) {
            statusCell.innerHTML = 'In Stock';
        }

        modal.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const request = indexedDB.open('ProductDB', 1);
    let db;

    request.onerror = function (event) {
        console.error('Error opening database:', event.target.errorCode);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
    };

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });

        objectStore.createIndex('productID', 'productID', {unique: false});
        objectStore.createIndex('productName', 'productName', { unique: false });
        objectStore.createIndex('category', 'category', { unique: false });
        objectStore.createIndex('brand', 'brand', { unique: false });
        objectStore.createIndex('notes', 'notes', { unique: false });
        objectStore.createIndex('count', 'count', { unique: false });
    };

    const form = document.getElementById('newStockForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const productID = document.getElementById('productID').value;
        const productName = document.getElementById('productName').value;
        const productCategory = document.getElementById('productCategory').value;
        const productBrand = document.getElementById('productBrand').value;
        const productNotes = document.getElementById('productNotes').value;
        const productCount = document.getElementById('productCount').value;

        const transaction = db.transaction(['products'], 'readwrite');
        const objectStore = transaction.objectStore('products');
        const newItem = {
            productID: productID,
            productName: productName,
            productCategory: productCategory,
            productBrand: productBrand,
            productNotes: productNotes,
            productCount: productCount,
        };

        const request = objectStore.add(newItem);

        request.onsuccess = function () {
            console.log('Product added successfully.');
        };

        request.onerror = function (event) {
            console.error('Error adding product:', event.target.error);
        };

        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    });
});