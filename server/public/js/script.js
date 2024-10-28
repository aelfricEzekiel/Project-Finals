async function productTracking() {
    const response = await fetch('http://localhost:3000/productTracking')
    const dataResponse = await response.json();

    const quantity = dataResponse.map(item => item.count);
    const prices = dataResponse.map(item => item.price);

    const ctx = document.getElementById('productChart').getContext('2d');
    
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Quantity',
                data: quantity,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Price',
                data: prices,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
                tension: 0.1,
            }
        ]
    };
    
    const mostlySoldProducts = [
        "Hard Disk Drive (HDD) 1TB",  // January
        "Graphics Processing Unit (GPU) RTX 4090",  // February
        "SSD 128GB",  // March
        "Laptop Stand",  // April
        "White Wireless Keyboard",  // May
        "White Wireless Keyboard",  // May
        "Wireless Mechanical Keyboard RGB",   // June
        "Graphics Processing Unit (GPU) RTX 3080",  // September
        "Graphics Processing Unit (GPU) RTX 3080",  // September
        "Graphics Processing Unit (GPU) RTX 3080",  // September
        "PIP Monitor",
        "Docky",   // July
        "USB Hub",
        "Pebble High-Spec System Unit",
        "Cooling Fan",  //  Novermber
        "PIP Monitor",
        "Drawing Tablet",
        "Graphics Processing Unit (GPU) RTX 4090",  // September
        "PIP Monitor",
        "SSD 128GB",
        "Graphics Processing Unit (GPU) RTX 3080",  // September
        "Hard Disk Drive (HDD) 1TB",
        "NVME PCLE SSD",  // February
        "W-Keyboard 2",
        "PIP Monitor"
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
    new Chart(ctx, config);
}
productTracking();