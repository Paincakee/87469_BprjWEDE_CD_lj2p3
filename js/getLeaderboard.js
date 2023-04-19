async function getLeaderboard() {
    try {
        const response = await fetch('api/getLeaderboard.php?', {
            method: 'GET',
        });

        const text = await response.text();

        console.log(text);
    
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOM loaded');
    getLeaderboard();
});