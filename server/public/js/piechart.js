const feedbackData = {
    records: 60, // Total feedback forms filled
    satisfaction: {
        verydissatisfied: 23,
        satisfied: 60,
        neutral: 20,
        verysatisfied: 36,
        dissatisfied: 20
    },
    recommend: {
        likely: 70,
        unlikely: 30
    }
};

// Chart Data
const data = {
    labels: ['Feedback Records', 'Satisfied', 'Very Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied', 'Likely to Recommend', 'Unlikely to Recommend'],
    datasets: [{
        label: 'Feedback Analysis',
        data: [ 
            feedbackData.records,
            feedbackData.satisfaction.verysatisfied,
            feedbackData.satisfaction.satisfied,
            feedbackData.satisfaction.neutral,
            feedbackData.satisfaction.verydissatisfied,
            feedbackData.satisfaction.dissatisfied,
            feedbackData.recommend.likely,
            feedbackData.recommend.unlikely
        ],
        backgroundColor: [
            '#2196F3', // Blue for feedback records
            '#4CAF50', // Green for satisfied
            '#b3cde0', // Pastel for for very satisfied
            '#FFC107', // Yellow for neutral
            'ed3833', // saturated red for very dissatisfied
            '#F44336', // Red for dissatisfied
            '#673AB7', // Purple for likely to recommend
            '#9E9E9E'  // Gray for unlikely to recommend
        ],
        hoverOffset: 4
    }]
};

// Chart Config
const config = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Customer Feedback and Customer Satisfaction'
            }
        }
    }
};

// Render the chart
const ctx = document.getElementById('feedbackChart').getContext('2d');
new Chart(ctx, config);