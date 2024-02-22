document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('stock-modal');
    var editModal = document.getElementById('edit-stock-modal');
    var newStockCloseBtn = document.querySelector("#stock-modal .close");
    var editingRowIndex;

    newStockCloseBtn.addEventListener('click', function () {
        clearInputValues();
        modal.style.display = 'none';
    });

    var editStockCloseBtn = document.querySelector("#edit-stock-modal .close");

    editStockCloseBtn.addEventListener('click', function () {
        closeEditModal();
    });

    function disableProductIdInput(editForm) {
        var productIdInput = editForm ? document.getElementById('product-id-edit') : document.getElementById('product-id');
        productIdInput.readOnly = true;
    }    

    function createEditButton() {
        var editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.innerHTML = '<img src="/Main/Images/edit.png" alt="Edit">';
        editButton.onclick = function () {
            editRow(this);
        };
        return editButton;
    }

    function disableProductIdInput(disable) {
        document.getElementById('product-id-edit').readOnly = disable;
    }
       
    function editRow(button) {
        var row = button.closest('tr');
        editingRowIndex = row.rowIndex;
        var productId = row.cells[1].textContent;
    
        openEditModal();
        disableProductIdInput();
        document.getElementById('product-id-edit').value = productId;
        document.getElementById('product-name-edit').value = row.cells[2].textContent;
        document.getElementById('product-category-edit').value = row.cells[3].textContent;
        document.getElementById('product-brand-edit').value = row.cells[4].textContent;
        document.getElementById('product-notes-edit').value = row.cells[5].textContent;
        document.getElementById('product-count-edit').value = row.cells[6].textContent;
    }

    function openStockModal() {
        disableProductIdInput(false);
        modal.style.display = 'block';
    }
    

    var newStockBtn = document.querySelector(".add-btn .add");

    newStockBtn.addEventListener('click', function () {
        openStockModal();
    });

    function openEditModal() {
        editModal.style.display = 'block';
    }

    document.getElementById('editSubmitButton').addEventListener('click', function (event) {
        event.preventDefault();
    
        var productName = document.getElementById('edit-product-name').value;
        var category = document.getElementById('edit-product-category').value;
        var brand = document.getElementById('edit-product-brand').value;
        var count = document.getElementById('edit-product-count').value;
    
        if (!productName || !category || !brand || !count) {
            alert('Please fill in all required fields.');
            return;
        }
    
        var editedRow = document.querySelector('.table').rows[editingRowIndex];
    
        if (editedRow) {
            editedRow.cells[1].textContent = productName;
            editedRow.cells[2].textContent = category;
            editedRow.cells[3].textContent = brand;
            editedRow.cells[5].textContent = count;
    
            document.getElementById('edit-stock-modal').style.display = 'none';
            closeEditModal();
        }
    });
    
            
    function closeEditModal() {
        clearInputValues('edit');
        editModal.style.display = 'none';
    }

    var closeBtn = document.querySelector("#edit-stock-modal .close");

    closeBtn.addEventListener('click', function () {
        closeEditModal();
    });

    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            closeEditModal();
        }
    });

    var editForm = document.getElementById('editStockForm');
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var editedProductName = document.getElementById('edit-product-name').value;
        var editedProductCategory = document.getElementById('edit-product-category').value;
        var editedProductBrand = document.getElementById('edit-product-brand').value;
        var editedProductNotes = document.getElementById('edit-product-notes').value;
        var editedProductCount = document.getElementById('edit-product-count').value;

        var table = document.querySelector('.table');
        var rows = table.querySelectorAll('tr');

        var productId = document.getElementById('edit-product-id').value;

        var editedRow;

        for (var i = 1; i < rows.length; i++) {
            var currentProductId = rows[i].cells[0].textContent;

            if (currentProductId === productId) {
                editedRow = rows[i];
                break;
            }
        }

        if (editedRow) {
            editedRow.cells[2].innerHTML = editedProductCategory;
            editedRow.cells[3].innerHTML = editedProductBrand;
            editedRow.cells[4].innerHTML = editedProductNotes;
            editedRow.cells[5].innerHTML = editedProductCount;

            console.log("Updated row for product ID:", productId); // Add this line
            console.log("Row content:", editedRow.cells); // Add this line
        }

        document.getElementById('edit-stock-modal').style.display = 'none';
    });

    window.openStockModal = function () {
        modal.style.display = 'block';
    };

    function clearInputValues() {
        document.getElementById('product-id').value = '';
        document.getElementById('product-name').value = '';
        document.getElementById('product-category').value = '';
        document.getElementById('product-brand').value = '';
        document.getElementById('product-notes').value = '';
        document.getElementById('product-count').value = '';
    }

    var newStockCloseBtn = document.querySelector("#stock-modal .close");

    newStockCloseBtn.addEventListener('click', function () {
        clearInputValues();
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    var form = document.getElementById('newStockForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var productId = document.getElementById('product-id').value;
        var productName = document.getElementById('product-name').value;
        var category = document.getElementById('product-category').value;
        var brand = document.getElementById('product-brand').value;
        var notes = document.getElementById('product-notes').value;
        var count = document.getElementById('product-count').value;

        var table = document.querySelector('.table');
        var rows = table.querySelectorAll('tr');

        var existingRow;

        for (var i = 1; i < rows.length; i++) {
            var currentProductId = rows[i].cells[0].textContent;

            if (currentProductId === productId) {
                existingRow = rows[i];
                break;
            }
        }

        if (existingRow) {
            existingRow.cells[1].innerHTML = productName;
            existingRow.cells[2].innerHTML = category;
            existingRow.cells[3].innerHTML = brand;
            existingRow.cells[4].innerHTML = notes;
            existingRow.cells[5].innerHTML = count;
            existingRow.cells[6].innerHTML = (count == 0) ? 'Out of Stock' : 'In Stock';

            console.log("Updated existing row for product ID:", productId); // Add this line
            console.log("Row content:", existingRow.cells); // Add this line
        } else {
            var newRow = table.insertRow(-1);

            var productIdCell = newRow.insertCell(0);
            var productNameCell = newRow.insertCell(1);
            var categoryCell = newRow.insertCell(2);
            var brandCell = newRow.insertCell(3);
            var notesCell = newRow.insertCell(4);
            var countCell = newRow.insertCell(5);
            var statusCell = newRow.insertCell(6);
            var checkBoxCell = newRow.insertCell(7);

            productIdCell.innerHTML = productId;
            productNameCell.innerHTML = productName;
            categoryCell.innerHTML = category;
            brandCell.innerHTML = brand;
            notesCell.innerHTML = notes;
            countCell.innerHTML = count;
            statusCell.innerHTML = (count == 0) ? 'Out of Stock' : 'In Stock';
            checkBoxCell.appendChild(createEditButton());

            console.log("Added new row for product ID:", productId); // Add this line
            console.log("Row content:", newRow.cells); // Add this line
        }

        clearInputValues();
        modal.style.display = 'none';
    });
});

jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};