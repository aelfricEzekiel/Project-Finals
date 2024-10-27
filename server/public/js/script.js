const ctx = document.getElementById('productChart').getContext('2d');

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Orders',
            data: [34, 24, 48, 34, 30, 47, 45, 32, 34, 28],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1,
        },
        {
            label: 'Quantity',
            data: [20, 24, 15, 10, 23, 50, 90, 85, 40, 58],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            tension: 0.1,
        },
        {
            label: 'Price',
            data: [540, 820, 1160, 2500, 3000, 3500, 4565, 3750, 19000, 6450],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.1,
        }
    ]
};

const mostlySoldProducts = [
    "Wireless Keyboard Black",  // January
    "NVME PCLE SSD",  // February
    "SSD 128GB",  // March
    "Laptop Stand",  // April
    "Laptop Bag",  // May
    "White Wireless Keyboard",   // June
    "Docky",   // July
    "Hard Disk Drive (HDD) 1TB",   // August
    "Graphics Processing Unit (GPU) RTX 3080",  // September
    "Wireless Keyboard RGB",  //  October
];

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Product Tracking: Orders, Quantity, Price and Mostly Sold Products'
            },
            tooltip: {
                callbacks: {
                    afterLabel: function (tooltipItem) {
                        const monthIndex = tooltipItem.dataIndex;
                        const mostlySoldProduct = mostlySoldProducts[monthIndex];
                        return `Mostly Sold: ${mostlySoldProduct}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Values'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Months'
                }
            }
        }
    }
};

// Initialize the chart
const productChart = new Chart(ctx, config);