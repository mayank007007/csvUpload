const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// this is for search particular row data
searchBtn.addEventListener('click', function () {
    const inputVal = searchInput.value.toLowerCase();
    const rows = document.getElementsByClassName('table-row');

    for (let i = 0; i < rows.length; i++) {
        const rowText = rows[i].textContent.toLowerCase();
        if (rowText.includes(inputVal) && inputVal) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
});

// Function to sort the table data based on the clicked column header
function sortTable(columnIndex, ascending) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const dataType = typeof Object.values(data[0])[columnIndex];

    rows.sort((row1, row2) => {
        const cellValue1 = row1.cells[columnIndex].innerText;
        const cellValue2 = row2.cells[columnIndex].innerText;

        if (dataType === 'string') {
            return ascending ? cellValue1.localeCompare(cellValue2) : cellValue2.localeCompare(cellValue1);
        } else {
            return ascending ? cellValue1 - cellValue2 : cellValue2 - cellValue1;
        }
    });

    // Update the table with sorted rows
    tbody.innerHTML = '';
    rows.forEach((row) => tbody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', () => {
    const tableHeaders = document.querySelectorAll('th');

    tableHeaders.forEach((header, index) => {
        let ascending = true;

        header.addEventListener('click', () => {
            // Toggle the sorting order
            ascending = !ascending;

            // Clear existing sort indicators
            tableHeaders.forEach((th) => th.querySelector('i').classList.remove('fa-sort-up', 'fa-sort-down'));

            // Add the appropriate sort indicator
            if (ascending) {
                header.querySelector('i').classList.add('fa-sort-up');
            } else {
                header.querySelector('i').classList.add('fa-sort-down');
            }

            sortTable(index, ascending);
        });
    });
});