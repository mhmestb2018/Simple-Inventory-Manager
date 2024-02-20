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